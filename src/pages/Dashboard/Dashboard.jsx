import React from 'react';
import './Dashboard.css';
import useFetchWithToken from '../../hooks/useFetchWithToken';

const Dashboard = () => {
  const { data: userData, loading, error } = useFetchWithToken('/api/users/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  const { balance, childAccounts, accountActivity } = userData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-row">
        <div className="dashboard-column">
          <h3 className="box-title">Balance</h3>
          <div className="box double-height">
            <p>${balance?.toFixed(2)}</p>
          </div>
          <h3 className="box-title">Quick Look at Child Accounts</h3>
          <div className="box double-height">
            <ul>
              {childAccounts?.map((account, index) => (
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
              {accountActivity?.map((activity, index) => (
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

