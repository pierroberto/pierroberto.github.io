import React from 'react';
import './dialog.css';

interface DialogProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ title, onClose, children }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};
