export interface BfgTracer {
  active?: boolean;
  alpha?: number;
  draw?: () => void;
  update?: () => void;
  x?: number;
  y?: number;
  toX?: number;
  toY?: number;
}
