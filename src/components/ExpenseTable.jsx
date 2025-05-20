const ExpenseTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.Date}</td>
            <td>{row.Category}</td>
            <td>{row.Amount}</td>
            <td>{row.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
