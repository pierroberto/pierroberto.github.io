import React from 'react';

interface DotProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const EmptyDot: React.FC<DotProps> = ({ x, y, onClick }) => {
  return (
    <div
      style={{
        position: 'relative',
        left: x,
        top: y,
        width: 10, 
        height: 10,
        backgroundColor: 'white',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    ></div>
  );
};
