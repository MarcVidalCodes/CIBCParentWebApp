import React, { useState, useEffect } from 'react';
import './LoadFunds.css';

const LoadFunds = () => {
  const [balance, setBalance] = useState(13000.00);
  const [childAccounts, setChildAccounts] = useState([
    { name: 'Tiago', balance: 150.00 },
    { name: 'Marc', balance: 200.00 },
    { name: 'Shawn', balance: 300.00 }
  ]);
  const [accountActivity, setAccountActivity] = useState([
    { user: 'Tiago', activity: 'Load Funds', amount: 75.00, currency: 'USD', date: '2022-01-02' }
  ]);
  const [fromAccount, setFromAccount] = useState('-');
  const [toAccount, setToAccount] = useState('Tiago'); // Default to Tiago
  const [recurringAllowance, setRecurringAllowance] = useState(false);
  const [allowanceFrequency, setAllowanceFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [amount, setAmount] = useState('$0.00');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Current balances:');
    console.log('Parent account balance:', balance);
    childAccounts.forEach(account => {
      console.log(`${account.name} account balance:`, account.balance);
    });
  }, [balance, childAccounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountValue = parseFloat(amount.replace('$', ''));
    if (amountValue <= 0 || toAccount === '-') {
      setMessage('Please fill fields');
      return;
    }

    let accountUpdated = false;
    const updatedChildAccounts = childAccounts.map(account => {
      if (account.name === toAccount) {
        accountUpdated = true;
        return { ...account, balance: account.balance + amountValue };
      }
      return account;
    });

    if (accountUpdated) {
      setChildAccounts(updatedChildAccounts);
      setBalance(prevBalance => prevBalance - amountValue); // Corrected to subtract the amount from the parent account balance
      const newActivity = { user: toAccount, activity: 'Load Funds', amount: amountValue, currency: 'USD', date: new Date().toISOString().split('T')[0] };
      setAccountActivity(prevActivity => [...prevActivity, newActivity]);
      setMessage('Funds loaded successfully');
      console.log('Updated account activity:', [...accountActivity, newActivity]);
      console.log('Funds amount loaded:', amountValue); // Added console log for funds amount loaded
    } else {
      setMessage('Failed to load funds');
    }

    console.log('Form submitted with:', { fromAccount, toAccount, recurringAllowance, allowanceFrequency, startDate, amount });
    console.log('Updated child accounts:', updatedChildAccounts);
    console.log('Updated parent balance:', balance - amountValue);

    // Clear the form
    setFromAccount('-');
    setToAccount('Tiago'); // Reset to Tiago
    setRecurringAllowance(false);
    setAllowanceFrequency('');
    setStartDate('');
    setAmount('$0.00');
  };

  const handlePresetAmount = (presetAmount) => {
    setAmount(`$${presetAmount.toFixed(2)}`);
  };

  return (
    <div className="load-funds-container">
      <h1 className="load-funds-title">Load Funds</h1>
      <div className="load-funds-box">
        <form className="load-funds-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="from-account" className="form-label">From Account</label>
            <select
              id="from-account"
              name="from-account"
              className="form-select"
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              required
            >
              <option value="-">-</option>
              <option value="parent">Parent Account (Luke)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="to-account" className="form-label">To Account</label>
            <select
              id="to-account"
              name="to-account"
              className="form-select"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              required
            >
              {childAccounts.map(account => (
                <option key={account.name} value={account.name}>{account.name} Account</option>
              ))}
            </select>
          </div>

          <div className="form-group checkbox-container">
            <input
              type="checkbox"
              id="recurring-allowance"
              name="recurring-allowance"
              checked={recurringAllowance}
              onChange={(e) => setRecurringAllowance(e.target.checked)}
            />
            <label htmlFor="recurring-allowance" className="checkbox-label">Recurring Allowance</label>
          </div>

          {recurringAllowance && (
            <div className="recurring-allowance-container">
              <div className="form-group">
                <label htmlFor="allowance-frequency" className="form-label">Allowance Frequency</label>
                <select
                  id="allowance-frequency"
                  name="allowance-frequency"
                  className="form-select"
                  value={allowanceFrequency}
                  onChange={(e) => setAllowanceFrequency(e.target.value)}
                  required
                >
                  <option value="">Select frequency...</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="start-date" className="form-label">Starting on</label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group amount-group">
            <label htmlFor="amount" className="form-label">Amount</label>
            <div className="amount-input-container">
              <input
                type="text"
                id="amount"
                name="amount"
                className="form-input amount-input"
                placeholder="$0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="preset-amount-buttons">
              <button type="button" className="preset-button" onClick={() => handlePresetAmount(50)}>$50</button>
              <button type="button" className="preset-button" onClick={() => handlePresetAmount(100)}>$100</button>
              <button type="button" className="preset-button" onClick={() => handlePresetAmount(250)}>$250</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="payment-method" className="form-label">Payment Method</label>
            <select id="payment-method" name="payment-method" className="form-select" required>
              <option value="-">-</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
            </select>
          </div>

          <button type="submit" className="form-button">Load Funds</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadFunds;

