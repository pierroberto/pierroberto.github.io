import React from 'react';
import './fullDot.css';

interface FullDotProps {
  x: number;
  y: number;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  id: string;
}

export const FullDot: React.FC<FullDotProps> = ({
  x,
  y,
  title,
  children,
  onClick,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        className="full-dot"
        style={{ left: x - 10, top: y - 10 }}
        onClick={onClick}
      />
      <div style={{ position: 'absolute', left: x - 20, top: y + 30 }}>
        {title}
      </div>
    </div>
  );
};
