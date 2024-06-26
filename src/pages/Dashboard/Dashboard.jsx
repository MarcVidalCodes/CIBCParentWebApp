import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-row">
        <div className="dashboard-column">
          <div className="box double-height">
            <h3>Balance</h3>
            {/* Replace with actual balance data or component */}
            <p>$1,000.00</p>
          </div>
          <div className="box double-height">
            <h3>Quick Look at Child Accounts</h3>
            {/* Replace with actual child accounts summary */}
            <ul>
              <li>Child 1: $500.00</li>
              <li>Child 2: $300.00</li>
              <li>Child 3: $200.00</li>
            </ul>
          </div>
        </div>
        <div className="dashboard-column">
          <div className="box single-height">
            <h3>AI Insights</h3>
            {/* Replace with AI insights content */}
            <p>AI analysis of spending patterns.</p>
          </div>
        </div>
      </div>
      <div className="dashboard-row">
        <div className="box full-width">
          <h3>Account Activity</h3>
          {/* Replace with actual account activity list */}
          <ul>
            <li>User: Child 1 | Date: 2024-06-30 | Amount: $50.00</li>
            <li>User: Child 2 | Date: 2024-06-29 | Amount: $20.00</li>
            <li>User: Child 3 | Date: 2024-06-28 | Amount: $30.00</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
