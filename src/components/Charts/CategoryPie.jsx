import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

const CategoryPie = ({ data }) => {
  const grouped = data.reduce((acc, curr) => {
    acc[curr.Category] = (acc[curr.Category] || 0) + parseFloat(curr.Amount);
    return acc;
  }, {});
  const chartData = Object.entries(grouped).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="chart-wrapper">
      <PieChart width={400} height={300}>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryPie;
