import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [childAccounts, setChildAccounts] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [accountActivity, setAccountActivity] = useState([]);

  useEffect(() => {
    // Fetch balance data
    setBalance(1000.00);

    // Fetch child accounts summary
    const initialChildAccounts = [
      { name: 'Child 1', balance: 500.00 },
      { name: 'Child 2', balance: 300.00 },
      { name: 'Child 3', balance: 200.00 }
    ];
    setChildAccounts(initialChildAccounts);

    // Fetch AI insights
    setAiInsights('AI analysis of spending patterns.');

    // Fetch account activity
    const activities = [
      { user: 'Child 1', date: '2024-06-30', amount: 50.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 3', date: '2024-06-28', amount: 30.00 }
    ];

    // Update child account balances based on activities
    const updatedChildAccounts = initialChildAccounts.map(account => {
      const accountActivities = activities.filter(activity => activity.user === account.name);
      const totalSpent = accountActivities.reduce((sum, activity) => sum + activity.amount, 0);
      return { ...account, balance: account.balance - totalSpent };
    });

    setChildAccounts(updatedChildAccounts);
    setAccountActivity(activities);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-row">
        <div className="dashboard-column">
          <h3 className="box-title">Balance</h3>
          <div className="box double-height">
            <p>${balance.toFixed(2)}</p>
          </div>
          <h3 className="box-title">Quick Look at Child Accounts</h3>
          <div className="box double-height">
            <ul>
              {childAccounts.map((account, index) => (
                <li key={index}>{account.name}: ${account.balance.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dashboard-column">
          <h3 className="box-title">AI Insights</h3>
          <div className="box single-height">
            <p>{aiInsights}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-row">
        <div className="dashboard-column full-width">
          <h3 className="box-title">Account Activity</h3>
          <div className="box scrollable-box">
            <ul>
              {accountActivity.map((activity, index) => (
                <li key={index} className="activity-box">
                  User: {activity.user} | Date: {activity.date} | Amount: ${activity.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
