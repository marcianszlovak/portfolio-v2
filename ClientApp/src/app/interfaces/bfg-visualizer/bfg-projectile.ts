export interface BfgProjectile {
  x: number;
  y: number;
  active?: boolean;
  width?: number;
  height?: number;
  destX?: number;
  destY?: number;
  angle?: number;
  frame?: number;
  maxFrame?: number;
  draw?: () => void;
  update?: () => void;
}
