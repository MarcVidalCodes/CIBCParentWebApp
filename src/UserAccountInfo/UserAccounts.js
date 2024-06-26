import { useState, useEffect } from 'react';
import userAccountInfo from './UserAccountInfo.json';

const useUserAccounts = () => {
  const [balance, setBalance] = useState(userAccountInfo.parentAccount.balance);
  const [childAccounts, setChildAccounts] = useState(Object.entries(userAccountInfo.childAccounts).map(([name, info]) => ({ name, ...info })));
  const [accountActivity, setAccountActivity] = useState(userAccountInfo.accountActivity);

  useEffect(() => {
    const updateChildBalances = () => {
      const updatedChildAccounts = childAccounts.map(account => {
        const accountActivities = accountActivity.filter(activity => activity.user === account.name);
        const totalSpent = accountActivities.reduce((sum, activity) => sum + activity.amount, 0);
        return { ...account, balance: account.balance - totalSpent };
      });

      setChildAccounts(updatedChildAccounts);
    };

    updateChildBalances();
  }, [accountActivity]);

  const updateBalance = (amount) => {
    setBalance(prevBalance => prevBalance - amount);
  };

  const updateChildAccountBalance = (accountName, amount) => {
    setChildAccounts(prevChildAccounts => {
      const updatedAccounts = prevChildAccounts.map(account => {
        if (account.name === accountName) {
          return { ...account, balance: account.balance + amount };
        }
        return account;
      });
      return updatedAccounts;
    });
  };

  const addAccountActivity = (activity) => {
    setAccountActivity(prevActivity => [...prevActivity, activity]);
  };

  return { balance, childAccounts, accountActivity, setChildAccounts, updateBalance, updateChildAccountBalance, addAccountActivity };
};

export default useUserAccounts;
