
import React from 'react';
import './ModelConfirm.css';

function ConfirmModel({ Message, OnDeleteConfirm, OnCancelDelete }) {
  return (
    <div className="ModelOverlay" onClick={OnCancelDelete}>
      <div className="Model">
        <p>{Message}</p>
        <div className="ModelButtons">
          <button onClick={OnDeleteConfirm}>Xác nhận</button>
          <button onClick={OnCancelDelete}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModel;
