import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Chart } from 'chart.js/auto';

const Forecast = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;

    const aggregateByDate = (data) => {
      const totals = {};
      data.forEach(row => {
        const date = row.Date;
        const amount = parseFloat(row.Amount);
        if (!isNaN(amount)) {
          totals[date] = (totals[date] || 0) + amount;
        }
      });
      return totals;
    };

    const runForecast = async () => {
      const dailyData = aggregateByDate(data);
      const dates = Object.keys(dailyData).map(d => new Date(d));
      const amounts = Object.values(dailyData);

      if (dates.length < 2) return; // Not enough data

      // Normalize dates to days since start
      const baseDate = dates[0];
      const daysSinceStart = dates.map(d => (d - baseDate) / (1000 * 60 * 60 * 24)); // in days

      // TensorFlow model
      const xs = tf.tensor(daysSinceStart);
      const ys = tf.tensor(amounts);

      const model = tf.sequential();
      model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
      model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

      await model.fit(xs.reshape([-1, 1]), ys.reshape([-1, 1]), { epochs: 300 });

      // Predict for next 30 days
      const futureXs = [];
      const futureLabels = [];
      for (let i = 1; i <= 30; i++) {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + daysSinceStart[daysSinceStart.length - 1] + i);
        futureLabels.push(d.toISOString().slice(0, 10));
        futureXs.push(daysSinceStart[daysSinceStart.length - 1] + i);
      }

      const predictions = model.predict(tf.tensor(futureXs).reshape([-1, 1]));
      const predictedValues = Array.from(predictions.dataSync());

      // Clear old chart if exists
      if (chartRef.current._chartInstance) {
        chartRef.current._chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartRef.current._chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: futureLabels,
          datasets: [
            {
              label: 'Predicted Expenses',
              data: predictedValues,
              fill: true,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,0,255,0.1)',
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Forecasted Expenses for Next 30 Days'
            }
          }
        }
      });
    };

    runForecast();
  }, [data]);

  return (
    <div>
      <h3>📈 Forecast: Next 30 Days</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Forecast;
