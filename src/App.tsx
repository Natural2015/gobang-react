import React, { useRef, useState } from "react";

import CheckerBoardCanvas from "./components/canvas";
import CheckerBoardDom from "./components/dom";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./const";

import { CheckerboardType, PieceType, Position } from "./type";
import { deepClone, isGameOver } from "./util";

import "./App.css";

function App() {
  const [checkerboardType, setCheckerboardType] = useState(CheckerboardType.Canvas);

  const [player, setPlayer] = useState(PieceType.A);
  const [pieces, setPieces] = useState(Array(BOARD_HEIGHT / 40).fill(Array(BOARD_WIDTH / 40).fill(PieceType.None)));
  const [piecesHistory, setPiecesHistory] = useState<number[][]>([]);
  const [piecesUndoHistory, setPiecesUndoHistory] = useState<number[][]>([]);
  const canvasRef = useRef<any>(null);

  /**
   * 初始化state
   */
  const initStates = () => {
    const arrayX = BOARD_WIDTH / 40;
    const arrayY = BOARD_HEIGHT / 40;
    setPieces(Array(arrayX).fill(Array(arrayY).fill(PieceType.None)));
    setPlayer(PieceType.A);
    setPiecesHistory([]);
    setPiecesUndoHistory([]);
  };

  /**
   * 切换棋盘类型
   */
  const switchCheckerboardType = () => {
    const to = checkerboardType === CheckerboardType.Canvas ? CheckerboardType.Dom : CheckerboardType.Canvas;
    setCheckerboardType(to);
    initStates();
  };

  /**
   * 棋盘点击事件
   * @param position 二维数组的坐标
   */
  const handleClick = (position: Position) => {
    // 记录落子状态
    const { x, y } = position;
    const tempPieces = deepClone(pieces);
    tempPieces[x][y] = player;
    setPieces(tempPieces);

    // 记录落子顺序
    const tempPiecesHistory = deepClone(piecesHistory);
    tempPiecesHistory.push([x, y]);
    setPiecesHistory(tempPiecesHistory);

    // 判断是否结束
    if (tempPiecesHistory.length > 8 && isGameOver(tempPieces, [x, y], player)) {
      setTimeout(() => {
        alert(player === PieceType.A ? "白子获胜" : "黑子获胜");
        initStates();
        canvasRef?.current?.initBoard?.(); // 调用子组件的 initBoard 方法
      }, 0);
    } else {
      // 切换玩家
      setPlayer(player === PieceType.A ? PieceType.B : PieceType.A);
    }
  };

  /**
   * 悔棋
   */
  const handleUndo = () => {
    const tempPiecesHistory = deepClone(piecesHistory);
    const popAction = tempPiecesHistory.pop() ?? [];
    if (checkerboardType === CheckerboardType.Canvas) {
      canvasRef?.current?.undo?.(tempPiecesHistory, pieces); // 调用子组件的 undo 方法
    }

    // 记录回退后的state
    const [x, y] = popAction;
    const tempPieces = deepClone(pieces);
    tempPieces[x][y] = 0;
    setPieces(tempPieces);
    setPiecesHistory(tempPiecesHistory);

    // 记录悔棋历史
    const tempUndoPieces = deepClone(piecesUndoHistory);
    tempUndoPieces.push(popAction);
    setPiecesUndoHistory(tempUndoPieces);

    // 更新下棋角色
    setPlayer(player === PieceType.A ? PieceType.B : PieceType.A);
  };

  const handleCancelUndo = () => {
    // 更新悔棋记录
    const tempPiecesUndoHistory = deepClone(piecesUndoHistory);
    const popAction = tempPiecesUndoHistory.pop() ?? [];
    if (checkerboardType === CheckerboardType.Canvas) {
      canvasRef?.current?.cancelUndo?.(popAction, player); // 调用子组件的 undo 方法
    }
    setPiecesUndoHistory(tempPiecesUndoHistory);

    // 更新下棋历史记录
    const tempPiecesHistory = deepClone(piecesHistory);
    tempPiecesHistory.push(popAction);
    setPiecesHistory(tempPiecesHistory);

    // 更新下棋内容
    const [x, y] = popAction;
    const tempPieces = deepClone(pieces);
    tempPieces[x][y] = player;
    setPieces(tempPieces);

    // 更新下棋角色
    setPlayer(player === PieceType.A ? PieceType.B : PieceType.A);
  };

  return (
    <div className="App">
      <h1 className="header">五子棋</h1>
      {checkerboardType === CheckerboardType.Canvas ? (
        <CheckerBoardCanvas pieces={pieces} handleClick={handleClick} ref={canvasRef} player={player} />
      ) : (
        <CheckerBoardDom pieces={pieces} handleClick={handleClick} />
      )}
      <div className="user-area">
        <span className={player === PieceType.A ? "active" : ""}> 玩家1(白子)</span>
      </div>
      <div className="user-area">
        <span className={player === PieceType.B ? "active" : ""}> 玩家2(黑子)</span>
      </div>
      <div className="handle-area">
        <button className="handle-area-btn" onClick={switchCheckerboardType}>
          {checkerboardType === CheckerboardType.Canvas ? "切换成Dom" : "切换成Canvas"}
        </button>
        <button className="handle-area-btn" disabled={piecesHistory.length === 0} onClick={handleUndo}>
          悔棋
        </button>
        <button className="handle-area-btn" disabled={piecesUndoHistory.length === 0} onClick={handleCancelUndo}>
          撤销悔棋
        </button>
      </div>
    </div>
  );
}

export default App;
