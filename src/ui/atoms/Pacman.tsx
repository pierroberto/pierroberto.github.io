import React from 'react';
import './pacman.css';

interface PacmanProps {
  x: number;
  y: number;
  angle: number;
}

export const Pacman: React.FC<PacmanProps> = ({ x, y, angle }) => {
  return (
    <div
      style={{
        position: 'relative',
        left: x,
        top: y,
        width: 50,
        height: 50,
        transition: 'left 0.05s, top 0.05s, transform 0.2s',
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
