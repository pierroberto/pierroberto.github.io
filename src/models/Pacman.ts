import { Coordinates } from './Coordinates';

export interface PacmanService {
  move: (target: Coordinates) => void;
  centroid: Coordinates;
}

export class Pacman implements PacmanService {
  public tl: number;
  public tr: number;
  public bl: number;
  public br: number;
  public centroid: Coordinates;

  constructor(coordinates: Coordinates, size: number) {
    this.tl = coordinates.x;
    this.tr = coordinates.x + size;
    this.bl = coordinates.y;
    this.br = coordinates.y + size;
    this.centroid = { x: this.tl + size / 2, y: this.bl + size / 2 };
  }

  private rotate(target: Coordinates) {
    const dx = target.x - this.centroid.x;
    const dy = target.y - this.centroid.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  private goLeft() {
    this.centroid.x = this.centroid.x - 1;
  }
  private goRight() {
    this.centroid.x = this.centroid.x + 1;
  }
  private goUp() {
    this.centroid.y = this.centroid.y + 1;
  }
  private goDown() {
    this.centroid.y = this.centroid.y - 1;
  }

  public move(target: Coordinates) {
    this.rotate(target);
    this.goLeft();

    if (this.centroid.x === target.x && this.centroid.y === target.y) {
    }
  }
}
