import React from 'react';
import './AiInsights.css';

const AiInsights = () => {
  return (
    <div className="ai-insights-container">
      <h1 className="ai-insights-title">AI Insights</h1>
      <div className="ai-insights-charts">
        <div className="chart-placeholder">Chart 1</div>
        <div className="chart-placeholder">Chart 2</div>
      </div>
      <div className="ai-text-container">
        <h2 className="ai-text-title">AI Explanation</h2>
        <p className="ai-text-content">
          Here the AI will provide detailed insights and explanations based on your spending data. 
          It will offer suggestions on how to optimize your budget, highlight areas where you can 
          save money, and predict future spending trends.
        </p>
      </div>
    </div>
  );
};

export default AiInsights;
