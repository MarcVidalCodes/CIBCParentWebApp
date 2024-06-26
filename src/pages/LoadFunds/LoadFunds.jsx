import React, { useState } from 'react';
import './LoadFunds.css';

const LoadFunds = () => {
  const [fromAccount, setFromAccount] = useState('parent'); // Defaulting to 'parent'
  const [toAccount, setToAccount] = useState('children'); // Defaulting to 'children'
  const [recurringAllowance, setRecurringAllowance] = useState(false);
  const [allowanceFrequency, setAllowanceFrequency] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { fromAccount, toAccount, recurringAllowance, allowanceFrequency, startDate });
    // Perform actions with form data here
  };

  return (
    <div className="load-funds-container">
      <h2 className="load-funds-title">Load Funds</h2>
      <p className="load-funds-instructions">
        Add funds to your account using the form below. Choose your preferred payment method and enter the amount you wish to load.
      </p>
      <form className="load-funds-form" onSubmit={handleSubmit}>
        <label htmlFor="from-account" className="form-label">From Account</label>
        <select
          id="from-account"
          name="from-account"
          className="form-select"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          required
        >
          <option value="parent">Parent Account</option>
        </select>

        <label htmlFor="to-account" className="form-label">To Account</label>
        <select
          id="to-account"
          name="to-account"
          className="form-select"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          required
        >
          <option value="children">Children Account</option>
        </select>

        <div className="checkbox-container">
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
          </>
        )}

        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="form-input"
          placeholder="Enter amount"
          required
        />

        <label htmlFor="payment-method" className="form-label">Payment Method</label>
        <select id="payment-method" name="payment-method" className="form-select" required>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>

        <button type="submit" className="form-button">Load Funds</button>
      </form>
    </div>
  );
};

export default LoadFunds;
