import { useState, useEffect } from 'react';

const useTransactionHistory = () => {
  const [balance, setBalance] = useState(0);
  const [childAccounts, setChildAccounts] = useState([]);
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

    // Fetch account activity
    const activities = [
      { user: 'Child 1', date: '2024-06-30', amount: 50.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 20.00 },
      { user: 'Child 2', date: '2024-06-29', amount: 21.00 },
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

  return { balance, childAccounts, accountActivity };
};

export default useTransactionHistory;
