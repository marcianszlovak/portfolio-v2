export interface BfgExplosion {
  x?: number;
  y?: number;
  active?: boolean;
  frame?: number;
  maxFrame?: number;
  draw?: () => void;
}
