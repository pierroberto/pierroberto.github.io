import { Coordinates } from './Coordinates';

export interface Dot {
  centroid: Coordinates;
  title: string;
  id: string;
  text: string;
  hidden: boolean;
  next: Array<string>;
  hit: boolean;
}

export const dots: Array<Dot> = [
  {
    title: 'Who I am',
    id: '0',
    text: 'Front End developer specialised in JavaScript technologies, experienced with Node, React, Typescript. Love building apps with great teams and always looking forward for the next challenge!',
    hidden: false,
    centroid: { x: 210, y: 160 },
    next: ['1', '2'],
    hit: false,
  },
  {
    title: 'B',
    id: '1',
    text: 'B',
    hidden: true,
    centroid: { x: 60, y: 260 },
    next: [],
    hit: false,
  },
  {
    hit: false,

    title: 'C',
    id: '2',
    text: 'C',
    hidden: true,
    centroid: { x: 260, y: 260 },
    next: ['3'],
  },
  {
    hit: false,

    title: 'D',
    id: '3',
    text: 'D',
    hidden: true,
    centroid: { x: 110, y: 360 },
    next: ['4'],
  },
  {
    hit: false,
    title: 'E',
    id: '4',
    text: 'E',
    hidden: true,
    centroid: { x: 110, y: 460 },
    next: [],
  },
];
