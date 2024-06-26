import React from 'react';
import './ParentalControls.css';

const ParentalControls = () => {
  return (
    <div>
      <h2 className="parental-controls-title">Parental Controls</h2>

      <div>
        <h3 className="section-title">Approve Transactions</h3>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>

      <div>
        <h3 className="section-title">Monitor Spending</h3>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>

      <div>
        <h3 className="section-title">Spending Controls</h3>
        <div className="input-group">
          <label>
            Set Limits:
            <input type="number" min="0" step="1" className="input-field" />
          </label>
        </div>
        <div className="input-group">
          <label>
            Freeze/Unfreeze Card:
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParentalControls;
