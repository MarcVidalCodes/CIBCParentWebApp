import React from 'react';
import './ParentalControls.css';

const ParentalControls = () => {
  return (
    <div className="parental-controls-container">
      <h2 className="parental-controls-title">Parental Controls</h2>

      <div className="parental-controls-section">
        <h3 className="section-title">Approve Transactions</h3>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      <div className="parental-controls-section">
        <h3 className="section-title">Monitor Spending</h3>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      <div className="parental-controls-section">
        <h3 className="section-title">Spending Controls</h3>
        <div>
          <label>
            Set Limits:
            <input type="number" min="0" step="1" />
          </label>
        </div>
        <div>
          <label>
            Freeze/Unfreeze Card:
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParentalControls;
