import React, { useEffect, useState } from 'react';
import cherrySrc from '../../../src/assets/cherry.png';
import pacmanSrc from '../../../src/assets/pacman.png';
import { Dot } from '../../models/Dot';
import { dots } from '../../state/fullDots';
import { FullDot } from '../atoms/FullDot';
import { Pacman } from '../atoms/Pacman';
import { Terminal } from '../atoms/Terminal';
import './App.css';

export const App: React.FC = () => {
  const [pacmanPosition, setPacmanPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);
  const [targetDot, setTargetDot] = useState<Dot | null>(null);
  const [angle, setAngle] = useState(0);
  const [dotId, setDotId] = useState<Dot | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [fullDots, setFullDots] = useState(dots);
  const pacmanRadius = 1; // Radius of the Pacman
  const dotRadius = 20; // Radius of the Dot

  useEffect(() => {
    if (!targetDot) return;

    // Calculate angle
    const dx = targetDot.x - pacmanPosition.x;
    const dy = targetDot.y - pacmanPosition.y;
    const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    setAngle(newAngle);

    // Rotation phase
    const rotateTimeout = setTimeout(() => {
      setIsMoving(true);
    }, 200); // Adjust this duration to ensure complete rotation

    return () => clearTimeout(rotateTimeout);
  }, [targetDot]);

  useEffect(() => {
    if (!isMoving || !targetDot) return;

    const moveInterval = setInterval(() => {
      setPacmanPosition((prevPosition) => {
        const { x, y } = prevPosition;
        const dx = targetDot.x - x;
        const dy = targetDot.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Stop when Pacman touches the dot
        console.log(distance);
        if (distance <= pacmanRadius + dotRadius) {
          setScore((score) => score + 1);
          setDotId(targetDot); // Save dot ID to state
          setTargetDot(null);
          setIsMoving(false);
          setFullDots((prev) => {
            return {
              ...prev,
              current: [
                ...prev.current,
                ...(prev.next ? [...prev.next.current] : []),
              ],
            };
          });
          clearInterval(moveInterval);
          return prevPosition;
        }

        const angle = Math.atan2(dy, dx);
        return {
          x: x + Math.cos(angle) * 10, // Increase speed by moving 10 units per interval
          y: y + Math.sin(angle) * 10, // Increase speed by moving 10 units per interval
        };
      });
    }, 50); // Decrease interval time to make Pacman faster

    return () => clearInterval(moveInterval);
  }, [
    isMoving,
    targetDot?.x,
    targetDot?.y,
    pacmanPosition.x,
    pacmanPosition.y,
  ]);

  const handleDotClick = (dot: Dot) => {
    setTargetDot(dot);
  };

  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            border: 'thick double #1919A6',
            width: '500px',
            height: '500px',
          }}
        >
          <Pacman x={pacmanPosition.x} y={pacmanPosition.y} angle={angle} />
          {fullDots.current.map((value, index) => (
            <FullDot
              key={index}
              id={value.id}
              title={value.title}
              x={value.x}
              y={value.y}
              onClick={() =>
                handleDotClick({
                  x: value.x,
                  y: value.y,
                  id: value.id,
                  title: value.title,
                  text: value.text,
                })
              }
            >
              <div></div>
            </FullDot>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            width: '500px',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <img src={pacmanSrc} width={25} height={25} />
            <img src={pacmanSrc} width={25} height={25} />
          </div>
          <div>
            <img src={cherrySrc} width={25} height={25} />
          </div>
        </div>
      </div>
      <div className="score">Score: {score} </div>
      <div className="terminal">
        {dotId?.text && <Terminal text={dotId.text} />}
      </div>
    </div>
  );
};
