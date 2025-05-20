import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const DailyTrendLine = ({ data }) => {
  const dailyTotals = {};

  data.forEach(r => {
    dailyTotals[r.Date] = (dailyTotals[r.Date] || 0) + parseFloat(r.Amount);
  });

  const chartData = Object.entries(dailyTotals)
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="chart-wrapper">
      <h3>📈 Daily Spending Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyTrendLine;
