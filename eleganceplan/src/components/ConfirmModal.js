import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Confirmation</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Delete</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
