import React from 'react';
import './pacman.css';

interface PacmanProps {
  x: number;
  y: number;
  angle: number;
  // onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const Pacman: React.FC<PacmanProps> = ({ x, y, angle }) => {
  return (
    <div
      tabIndex={0}
      style={{
        zIndex: 1,
        position: 'relative',
        left: x,
        top: y,
        width: 50,
        height: 50,
        transition:
          'left 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s',
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div className="pacman-holder">
        <div className="pacman-container">
          <div className="pacman-body"></div>
          <div className="pacman-mouth">
            <div className="pacman"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
