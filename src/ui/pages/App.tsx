import React, { useEffect, useState } from 'react';
import cherrySrc from '../../../src/assets/cherry.png';
import pacmanSrc from '../../../src/assets/pacman.png';
import { Dot, dots } from '../../models/Dot';
import { FullDot } from '../atoms/FullDot';
import { Pacman } from '../atoms/Pacman';
import { Terminal } from '../atoms/Terminal';
import './App.css';
import { PacmanService } from '../../models/Pacman';
import { Coordinates } from '../../models/Coordinates';
import pacmanMouthSrc from '../../assets/pacmanMouth.wav';
import { useWithSound } from '../../models/withSound';

type KeyArrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

const rotate = (key: KeyArrow, defaultDeg: number) => {
  switch (key) {
    case 'ArrowUp':
      return { deg: -90, key };
    case 'ArrowRight':
      return { deg: 0, key };
    case 'ArrowDown':
      return { deg: 90, key };
    case 'ArrowLeft':
      return { deg: 180, key };
    default:
      return { deg: defaultDeg, key };
  }
};

const handleKeyDown =
  (
    setPacmanPosition: React.Dispatch<React.SetStateAction<Coordinates>>,
    setAngle: React.Dispatch<React.SetStateAction<SetAngle>>,
    sound: any,
  ) =>
  (e: KeyboardEvent) => {
    const ACCELARATION = 20;

    switch (e.key) {
      case 'ArrowUp':
        sound().play();
        setAngle((previousAngle) => rotate('ArrowUp', previousAngle.deg));
        setPacmanPosition((prev) => {
          return { x: prev.x, y: prev.y - ACCELARATION };
        });
        break;
      case 'ArrowDown':
        sound().play();
        setAngle((previousAngle) => rotate('ArrowDown', previousAngle.deg));
        setPacmanPosition((prev) => {
          return { x: prev.x, y: prev.y + ACCELARATION };
        });
        break;
      case 'ArrowLeft':
        sound().play();
        setAngle((previousAngle) => rotate('ArrowLeft', previousAngle.deg));
        setPacmanPosition((prev) => {
          return { x: prev.x - ACCELARATION, y: prev.y };
        });
        break;
      case 'ArrowRight':
        sound().play();
        setAngle((previousAngle) => rotate('ArrowRight', previousAngle.deg));
        setPacmanPosition((prev) => {
          return { x: prev.x + ACCELARATION, y: prev.y };
        });
    }
  };

type SetAngle = { deg: number; key: KeyArrow };

export const App: React.FC<{ pacman: PacmanService }> = () => {
  const [pacmanPosition, setPacmanPosition] = useState({ x: 0, y: 0 });
  const [audioEnabled, setAudioEnabled] = useState(false);
  const playMouthSound = useWithSound(pacmanMouthSrc);
  const [score, setScore] = useState(0);
  const [angle, setAngle] = useState<SetAngle>({
    deg: 0,
    key: 'ArrowRight',
  });
  const [selectedDot, selectDot] = useState<Dot | null>(null);
  const [fullDots, setFullDots] = useState(dots);

  useEffect(() => {
    const s = playMouthSound();
    if (!s) {
      return;
    }

    if (audioEnabled) {
      s.volume = 1;
    } else {
      s.volume = 0;
    }
  }, [audioEnabled]);

  useEffect(() => {
    document.addEventListener(
      'keydown',
      handleKeyDown(setPacmanPosition, setAngle, playMouthSound),
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown(setPacmanPosition, setAngle, playMouthSound),
      );
    };
  }, []);

  function replaceObjectAtIndex(
    array: Array<Dot>,
    index: number,
    newObject: Dot,
  ) {
    // Check if the index is within the bounds of the array
    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }

    // Create a new array with the object at the given index replaced
    const newArray = [...array]; // Create a shallow copy of the array
    newArray[index] = newObject; // Replace the object at the given index with the new object

    return newArray;
  }

  useEffect(() => {
    const filteredDots = fullDots
      .map((dot, index) => {
        return {
          ...dot,
          index,
          diffX: Math.abs(dot.centroid.x - (pacmanPosition.x + 25)),
          diffY: Math.abs(dot.centroid.y - (pacmanPosition.y + 25)),
        };
      })

      .filter((dot) => dot.diffX <= 30 && dot.diffY <= 30);
    let hitDot: (Dot & { index: number }) | null = null;
    if (filteredDots.length > 0) {
      hitDot = filteredDots.reduce((lowest, current) => {
        const currentCombinedDiff = current.diffX + current.diffY;
        const lowestCombinedDiff = lowest.diffX + lowest.diffY;

        return currentCombinedDiff < lowestCombinedDiff ? current : lowest;
      });
    }
    if (hitDot) {
      if (hitDot.hit) {
        selectDot(hitDot);
      }
      const newDot: Dot = { ...hitDot, hidden: false, hit: true };
      let x = replaceObjectAtIndex(fullDots, hitDot.index, newDot);

      const unlockedDots: Array<Dot> = hitDot.next.reduce((acc, nextDotId) => {
        const d2 = fullDots.find((d) => d.id === nextDotId);
        return d2 ? [...acc, { ...d2, hidden: false }] : acc;
      }, [] as Array<Dot>);

      unlockedDots.forEach((dotToUnlock) => {
        const dotIndex = fullDots.findIndex((d) => d.id === dotToUnlock.id);
        if (dotIndex > -1) {
          x = replaceObjectAtIndex(fullDots, dotIndex, dotToUnlock);
        }
      });
      setFullDots(x);
    }
  }, [pacmanPosition.x, pacmanPosition.y]);

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
          <Pacman x={pacmanPosition.x} y={pacmanPosition.y} angle={angle.deg} />

          {fullDots.map((value, index) =>
            value.hidden ? null : (
              <FullDot
                key={index}
                id={value.id}
                title={value.title}
                x={value.centroid.x}
                y={value.centroid.y}
                onClick={() => {}}
              >
                <div></div>
              </FullDot>
            ),
          )}
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
      <div className="score">
        Score: {score}{' '}
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => setAudioEnabled((prev) => !prev)}
        >
          Sound {audioEnabled ? 'enabled' : 'disabled'}
        </div>{' '}
      </div>
      <div className="terminal">
        {selectedDot && <Terminal text={selectedDot.text} />}
      </div>
    </div>
  );
};
