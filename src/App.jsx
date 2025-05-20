import { useState } from 'react';
import FileUploader from './components/FileUploader';
import ExpenseTable from './components/ExpenseTable';
import CategoryPie from './components/Charts/CategoryPie';
import DailyTrendLine from './components/Charts/DailyTrendLine';
import TopCategoriesBar from './components/Charts/TopCategoriesBar';
import SummaryCards from './components/KPIs/SummaryCards';
import CsvGuideModal from './components/CsvGuideModal';
import Forecast from './components/Forecast'; 

import './App.css';

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForecast, setShowForecast] = useState(false);

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="title">Vyayadarshi</h1>
        <button className='guide-button' onClick={() => setShowGuide(true)}>
          CSV Format Guide
        </button>
        {showGuide && <CsvGuideModal onClose={() => setShowGuide(false)} />}
      </div>
      
      <hr className="divider" />
      <h1>Expense Analyzer</h1>
      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Processing your data...</p>
        </div>
      )}
      <FileUploader setData={setExpenseData} setIsLoading={setIsLoading} />
      {expenseData.length > 0 && (
        <>
          <SummaryCards data={expenseData} />
          <ExpenseTable data={expenseData} />
          <CategoryPie data={expenseData} />
          <DailyTrendLine data={expenseData} />
          <TopCategoriesBar data={expenseData} />
          <button 
            className='button'
            onClick={() => setShowForecast(!showForecast)}
          >
            {showForecast ? 'Hide Forecast' : 'Show Forecast'}
          </button>
          {showForecast && <Forecast data={expenseData} />}
        </>
      )}
    </div>
  );
}

export default App;