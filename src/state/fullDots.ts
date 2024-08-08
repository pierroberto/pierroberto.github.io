import { Dot, Dot2 } from '../models/Dot';
import { LinkedList } from '../models/LinkedList';

const centerX: number = 250;
const centerY: number = 180;

const radius1: number = 180; // Outer circle
const radius2: number = 110; // Middle circle
const radius3: number = 40; // Inner circle

const pointsPerCircle = 4;
const angleIncrement = (2 * Math.PI) / pointsPerCircle;

// Rotate angle for the middle circle
const middleCircleRotation = Math.PI / 4; // 45 degrees

const generateCircleCoordinates = (
  centerX: number,
  centerY: number,
  radius: number,
  pointsCount: number,
  titles: string[],
  startIdx: number,
  rotation: number = 0,
): Dot[] => {
  return Array.from({ length: pointsCount }, (_, idx) => {
    const angle = idx * angleIncrement + rotation;
    return {
      id: Math.random().toString(),
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      title: titles[startIdx + idx],
      text: texts[startIdx + idx],
    };
  });
};
const texts: string[] = [
  'Facile.it',
  'NTTData',
  'Auriga is a key player, at an international level, in the creation of proprietary software solutions, specialising particularly in Banking area.',
  'ZenDama',
  'Hasselt',
  'Siena',
  'Bologna',
  'Barcelona',
  'JavaScript',
  'React',
  'TypeScript',
  'NodeJS',
];
const titles: string[] = [
  'Facile.it',
  'NTTData',
  'Auriga',
  'ZenDama',
  'Hasselt',
  'Siena',
  'Bologna',
  'Barcelona',
  'JavaScript',
  'React',
  'TypeScript',
  'NodeJS',
];

export const dots2: LinkedList<Dot2> = {
  current: [{ x: 50, y: 150, title: 'A', id: 'A', text: 'A', hidden: false }],
  next: {
    current: [
      { x: 50, y: 250, title: 'A', id: 'A', text: 'A', hidden: true },
      { x: 100, y: 250, title: 'A', id: 'A', text: 'A', hidden: true },
    ],
    next: {
      current: [
        { x: 150, y: 350, title: 'B', id: 'B', text: 'B', hidden: true },
      ],
      next: null,
    },
  },
};
