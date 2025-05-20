import React from 'react';
import './SummaryCards.css';

const SummaryCards = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Clean & parse amounts and dates
  const cleanedData = data.map((item) => ({
    ...item,
    Amount: parseFloat(item.Amount?.toString().replace(/[^\d.-]/g, '')) || 0,
    Date: item.Date?.trim(),
  }));

  // Total amount spent
  const total = cleanedData.reduce((sum, r) => sum + r.Amount, 0);

  // Unique dates
  const dates = [...new Set(cleanedData.map(r => r.Date))].filter(Boolean);
  const avg = total / (dates.length || 1); // avoid divide-by-zero

  // Calculate max spend day
  const dailyTotals = {};
  cleanedData.forEach(r => {
    if (!r.Date) return;
    dailyTotals[r.Date] = (dailyTotals[r.Date] || 0) + r.Amount;
  });

  const maxDayEntry = Object.entries(dailyTotals).reduce((a, b) => a[1] > b[1] ? a : b, ["-", 0]);

  return (
    <div className="kpi-wrapper">
      <div className="kpi-card">💰 Total Spent: ₹{total.toFixed(2)}</div>
      <div className="kpi-card">📅 Avg/Day: ₹{avg.toFixed(2)}</div>
      <div className="kpi-card">🔥 Max Spend: ₹{maxDayEntry[1].toFixed(2)} on {maxDayEntry[0]}</div>
    </div>
  );
};

export default SummaryCards;
