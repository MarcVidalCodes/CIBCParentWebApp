import React, { useState } from 'react';
import './ParentalControls.css';

const ParentalControls = () => {
  const [selectedChild, setSelectedChild] = useState('');
  const children = ['Marc', 'Shawn', 'Tiago']; // Example children names

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

  return (
    <div className="parental-controls-container">
      <h1 className="parental-controls-title">Parental Controls</h1>
      
      <div className="dropdown-container">
        <label htmlFor="child-select" className="dropdown-label">Select Child:</label>
        <select id="child-select" value={selectedChild} onChange={handleChildChange} className="dropdown-select">
          <option value="" disabled>Select a child</option>
          {children.map((child, index) => (
            <option key={index} value={child}>{child}</option>
          ))}
        </select>
      </div>

      {selectedChild && (
        <>
          <div className="parental-controls-section">
            <h2 className="section-title">Transaction Approval</h2>
            <p>Enable or disable the approval of transactions for your child's account.</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="parental-controls-section">
            <h2 className="section-title">Spending Monitoring</h2>
            <p>Monitor your child's spending activities in real-time.</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="parental-controls-section">
            <h2 className="section-title">Spending Limits</h2>
            <p>Set spending limits to control how much your child can spend.</p>
            <div className="input-group">
              <label>
                Set Limit:
                <input type="number" min="0" step="1" className="input-field" />
              </label>
            </div>
          </div>

          <div className="parental-controls-section">
            <h2 className="section-title">Card Control</h2>
            <p>Freeze or unfreeze your child's card to prevent unauthorized use.</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentalControls;

