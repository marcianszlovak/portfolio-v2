export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velY: number;
  velX: number;
  angleFrame: number;
  frame: number;
  maxFrame: number;
  firing: boolean;
  moving: boolean;
}
