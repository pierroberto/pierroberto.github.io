export interface LinkedList<A> {
  current: Array<A>;
  next: LinkedList<A> | null;
}
