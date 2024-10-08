import React from 'react';
import './fullDot.css';

interface FullDotProps {
  x: number;
  y: number;
  onClick: () => void;
  title: string;
  id: string;
}

export const FullDot: React.FC<FullDotProps> = ({ x, y, title, onClick }) => {
  return (
    <div style={{ position: 'absolute' }}>
      <div
        className="full-dot"
        style={{ left: x - 10, top: y + 10 }}
        onClick={onClick}
      />
      <span style={{ position: 'relative', left: x + 20, top: y + 10 }}>
        {title}
      </span>
    </div>
  );
};
