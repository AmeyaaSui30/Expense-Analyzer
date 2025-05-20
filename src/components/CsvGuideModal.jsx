import React from 'react';
import './CsvGuideModal.css';

const CsvGuideModal = ({ onClose }) => {
  const downloadSampleCsv = () => {
    const sampleData = `Date,Category,Description,Amount
2025-05-01,Groceries,Big Bazaar shopping,450
2025-05-01,Transport,Uber to office,120
2025-05-02,Food,Domino's pizza,340.50`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample-expenses.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop">
      <div className="csv-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>📄 CSV Format Guide</h2>
        <p>Please upload a CSV with the following columns:</p>
        <ul>
          <li><strong>Date</strong> (e.g., 2025-05-01)</li>
          <li><strong>Category</strong> (e.g., Food, Transport)</li>
          <li><strong>Description</strong> (short text)</li>
          <li><strong>Amount</strong> (number, e.g., 300 or ₹450.75)</li>
        </ul>
        <p>Example:</p>
        <table className="csv-sample">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-05-01</td>
              <td>Groceries</td>
              <td>Big Bazaar shopping</td>
              <td>450</td>
            </tr>
            <tr>
              <td>2025-05-01</td>
              <td>Transport</td>
              <td>Uber to office</td>
              <td>120</td>
            </tr>
            <tr>
              <td>2025-05-02</td>
              <td>Food</td>
              <td>Domino's pizza</td>
              <td>340.50</td>
            </tr>
          </tbody>
        </table>
        <div className="download-options">
          <button 
            className="sample-download-btn" 
            onClick={downloadSampleCsv}
          >
             Download Sample CSV
          </button>
          <div className="print-tip">
            <p>💡 Tip: To save page as PDF, press <kbd>Ctrl</kbd> + <kbd>P</kbd> and select "Save as PDF"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvGuideModal;
