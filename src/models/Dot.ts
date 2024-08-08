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
