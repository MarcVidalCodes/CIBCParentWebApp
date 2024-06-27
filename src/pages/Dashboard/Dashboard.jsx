import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({
    balance: 1234.56,
    childAccounts: [
      { name: 'Child Account 1', balance: 234.56 },
      { name: 'Child Account 2', balance: 345.67 }
    ],
    accountActivity: [
      { user: 'User1', date: '2023-10-01', amount: 45.67 },
      { user: 'User2', date: '2023-10-02', amount: 78.90 }
    ]
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
          }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (response.status === 304) {
          console.log('Using cached token');
          setToken(localStorage.getItem('jwtToken'));
          return;
        }

        if (response.ok) {
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setToken(data.token);
            console.log('Token in Dashboard:', data.token); // Debugging token value
          } else {
            console.error('Expected JSON response but got:', contentType);
            const text = await response.text();
            console.error('Response text:', text);
          }
        } else {
          console.error('Failed to fetch token:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const { balance, childAccounts, accountActivity } = userData;

  return (
    <div className="dashboard-container">
      <h2>Hello, {token}</h2> {/* Displaying the raw JWT token */}
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
            <p>AI analysis of spending patterns.</p>
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
