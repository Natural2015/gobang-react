/** 棋盘类型 */
export enum CheckerboardType {
  Dom,
  Canvas,
}

/** 棋子类型 */
export enum PieceType {
  None,
  A,
  B,
}

/**
 * 坐标
 */
export interface Position {
  x: number;
  y: number;
}
