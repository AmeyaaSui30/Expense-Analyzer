import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TopCategoriesBar = ({ data }) => {
  const categoryTotals = {};

  data.forEach(r => {
    categoryTotals[r.Category] = (categoryTotals[r.Category] || 0) + parseFloat(r.Amount);
  });

  const chartData = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="chart-wrapper">
      <h3>📊 Top Spending Categories</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCategoriesBar;
