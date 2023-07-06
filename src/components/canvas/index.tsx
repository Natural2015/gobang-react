import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../const";
import { PieceType, Position } from "../../type";

import imageASrc from "../../assets/img/playA.png";
import imageBSrc from "../../assets/img/playB.png";

import "./index.css";

type SelfProps = {
  player: number;
  pieces: number[][];
  handleClick: (position: Position) => void;
};

const CheckerBoardCanvas = forwardRef(function CheckerBoardCanvas(props: SelfProps, ref) {
  const { player, pieces, handleClick } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageA = new Image();
  imageA.src = imageASrc;

  const imageB = new Image();
  imageB.src = imageBSrc;

  /**
   * 清空棋盘
   */
  const initBoard = () => {
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    drawBoard();
  };

  /**
   * 绘制棋盘
   */
  const drawBoard = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      // 在这里使用canvas和ctx进行绘图操作

      // 绘制水平线
      let restLineX = BOARD_HEIGHT / 40;
      while (restLineX > -1) {
        ctx?.beginPath();
        ctx?.moveTo(20, 20 + restLineX * 40);
        ctx?.lineTo(BOARD_WIDTH - 20, 20 + restLineX * 40);
        ctx?.closePath();
        ctx?.stroke();
        restLineX--;
      }

      // 绘制垂直线
      let restLineY = BOARD_WIDTH / 40;
      while (restLineY > -1) {
        ctx?.beginPath();
        ctx?.moveTo(20 + restLineY * 40, 20);
        ctx?.lineTo(20 + restLineY * 40, BOARD_HEIGHT - 20);
        ctx?.closePath();
        ctx?.stroke();
        restLineY--;
      }
    }
  };

  /**
   * 悔棋
   */
  const undo = (tempPiecesHistory: number[][], tempPieces: number[][]) => {
    /** 绘制棋子 */
    const ctx = canvasRef.current?.getContext("2d");
    initBoard();
    for (let position of tempPiecesHistory) {
      const [x, y] = position;
      ctx?.drawImage(tempPieces[x][y] === PieceType.A ? imageA : imageB, y * 40, x * 40);
    }
  };

  /**
   * 撤销悔棋
   */
  const cancelUndo = (popAction: number[], tempPlayer: number) => {
    // 绘制棋子
    const ctx = canvasRef.current?.getContext("2d");
    const [x, y] = popAction;
    ctx?.drawImage(tempPlayer === PieceType.A ? imageA : imageB, y * 40, x * 40);
  };

  /**
   * 下棋
   * @param event 棋盘点击事件
   */
  const handleCanvasClick = (event: any) => {
    const { left = 0, top = 0 } = canvasRef?.current?.getBoundingClientRect() ?? {};
    // 获取点击位置
    let x = Math.floor((event.clientX - left) / 40);
    let y = Math.floor((event.clientY - top) / 40);
    if (pieces?.[y]?.[x] > 0) {
      alert("已经有棋子了");
    } else {
      // 绘制棋子
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.drawImage(player === PieceType.A ? imageA : imageB, x * 40, y * 40);

      // 绘制棋子
      [x, y] = [y, x];
      handleClick({ x, y });
    }
  };

  useEffect(() => {
    // 绘制棋盘
    drawBoard();
  }, []);

  /**
   * 提供给父组件的fn
   */
  useImperativeHandle(
    ref,
    () => {
      return {
        // 清空棋盘
        initBoard,
        // 悔棋
        undo,
        // 撤销悔棋
        cancelUndo,
      };
    },
    []
  );
  return (
    <canvas
      className="canvas-board"
      ref={canvasRef}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      onClick={handleCanvasClick}
    />
  );
});
export default CheckerBoardCanvas;
