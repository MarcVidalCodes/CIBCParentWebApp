import React, { useState, useEffect } from 'react';
import './AiInsights.css';
import piechart from '../../assets/chart.png';

const AiInsights = () => {
  const [selectedName, setSelectedName] = useState('Shawn');
  const explanations = {
    Shawn: ' You have spent $150 on fashion this month, up 25% from last month. This increase indicates a notable rise in your fashion expenditures. It might be beneficial to review your shopping habits and consider ways to manage your budget more effectively.',
    Marc: ' Your monthly spending is X, which is X % of your total income.',
    Tiago: ' This week, you spent X on TAG HERE. To meet your yearly savings goal, you need to limit your spending to X per week.'
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div className="ai-insights-container">
      <h1 className="ai-insights-title">AI Insights</h1>
      <div className="dropdown-container">
        <label htmlFor="name-select" className="dropdown-label">Insights for: </label>
        <select id="name-select" value={selectedName} onChange={handleNameChange} className="dropdown-select">
          <option value="Shawn">Shawn</option>
          <option value="Marc">Marc</option>
          <option value="Tiago">Tiago</option>
        </select>
      </div>
      <div className="ai-insights-content">
        <div className="ai-insights-box">
          {selectedName === 'Shawn' ? <img src={piechart} alt="Pie Chart" /> : selectedName === 'Marc' ? 'Chart 2' : 'Chart 3'}
        </div>
        <div className="ai-insights-box">
          <div className="ai-text-container">
            <h2 className="ai-text-title">AI Explanation</h2>
            <p className="ai-text-content">{explanations[selectedName]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;