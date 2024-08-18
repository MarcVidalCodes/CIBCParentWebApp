import React, { useState } from 'react';
import './LoadFunds.css';

const LoadFunds = () => {
  const [fromAccount, setFromAccount] = useState('-');
  const [toAccount, setToAccount] = useState('Child1'); // Default to Child1
  const [recurringAllowance, setRecurringAllowance] = useState(false);
  const [allowanceFrequency, setAllowanceFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [amount, setAmount] = useState('$0.00');

  const handlePresetAmount = (presetAmount) => {
    setAmount(`$${presetAmount.toFixed(2)}`);
  };

  return (
    <div className="load-funds-container">
      <h2 className="load-funds-title">Load Funds</h2>
      <form className="load-funds-form">
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
            <option value="parent">Parent Account</option>
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
            {/* Placeholder for future childAccounts data */}
            <option value="Child1">Child1 Account</option>
            <option value="Child2">Child2 Account</option>
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
          <>
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
          </>
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
    </div>
  );
};

export default LoadFunds;
