import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const balance = 13402.33;
  const childAccounts = [
    { name: 'Marc', balance: 185.00 },
    { name: 'Shawn', balance: 150.00 },
    { name: 'Tiago', balance: 432.00 }
  ];
  const accountActivity = [
    { user: 'Marc', activity: 'Load Funds', amount: 50.00, date: '2022-01-01', category: 'Other' },
    { user: 'Shawn', activity: 'Load Funds', amount: 75.00, date: '2022-01-02', category: 'Other' },
    { user: 'Tiago', activity: 'Load Funds', amount: 100.00, date: '2022-01-03', category: 'Other' },
    { user: 'Marc', activity: 'Purchase', amount: 20.00, date: '2022-01-04', category: 'Electronics' },
    { user: 'Shawn', activity: 'Purchase', amount: 30.00, date: '2022-01-05', category: 'Food' },
    { user: 'Tiago', activity: 'Purchase', amount: 40.00, date: '2022-01-06', category: 'Fashion' },
    { user: 'Marc', activity: 'Load Funds', amount: 60.00, date: '2022-01-07', category: 'Other' },
    { user: 'Shawn', activity: 'Load Funds', amount: 80.00, date: '2022-01-08', category: 'Other' },
    { user: 'Tiago', activity: 'Load Funds', amount: 90.00, date: '2022-01-09', category: 'Other' },
    { user: 'Marc', activity: 'Purchase', amount: 25.00, date: '2022-01-10', category: 'Rent' },
    { user: 'Shawn', activity: 'Purchase', amount: 35.00, date: '2022-01-11', category: 'Utilities' },
    { user: 'Tiago', activity: 'Purchase', amount: 45.00, date: '2022-01-12', category: 'Subscriptions' },
    { user: 'Marc', activity: 'Load Funds', amount: 70.00, date: '2022-01-13', category: 'Other' },
    { user: 'Shawn', activity: 'Load Funds', amount: 85.00, date: '2022-01-14', category: 'Other' },
    { user: 'Tiago', activity: 'Load Funds', amount: 95.00, date: '2022-01-15', category: 'Other' }
  ];

  // Sort accountActivity by date
  accountActivity.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="dashboard-container">
      <h1 className="box-title large-title hello-shawn">Hello, Luke</h1>
      <div className="dashboard-row">
        <div className="dashboard-column">
          <h3 className="box-title">Account Balance</h3>
          <div className="box double-height" style={{ fontSize: '4em' }}>
            <p>${balance.toFixed(2)}</p>
          </div>
          <h3 className="box-title">Child Account Balances</h3>
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
          <div className="box double-height">
            <p>CIBC AI suggests Marc can save $15 monthly by reducing video game spending by 20%. Shawn could save $25 each month by packing lunch. Tiago can save $10 monthly by cutting back on snacks.</p>
          </div>
        </div>
      </div>
      <div className="dashboard-row">
        <div className="dashboard-column full-width">
          <h3 className="box-title">Account Activity</h3>
          <div className="box scrollable-box" style={{ height: '400px', textAlign: 'left' }}>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {accountActivity.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.date}</td>
                    <td>{activity.user}</td>
                    <td>{activity.activity}</td>
                    <td>${activity.amount.toFixed(2)}</td>
                    <td>{activity.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
