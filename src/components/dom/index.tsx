import React, { useRef } from "react";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../../const";

import imageASrc from "../../assets/img/playA.png";
import imageBSrc from "../../assets/img/playB.png";

import "./index.css";
import { PieceType, Position } from "../../type";

type SelfProps = {
  pieces: number[][];
  handleClick: (position: Position) => void;
};

const CheckerBoardDom = (props: SelfProps) => {
  const { pieces, handleClick } = props;
  const domRef = useRef<HTMLDivElement>(null);

  /**
   * 下棋
   * @param event 棋盘点击事件
   */
  const handleDomClick = (event: any) => {
    const { left = 0, top = 0 } = domRef?.current?.getBoundingClientRect() ?? {};
    // 获取点击位置
    let x = Math.floor((event.clientX - left) / 40);
    let y = Math.floor((event.clientY - top) / 40);
    console.log(x, y);
    if (pieces?.[x]?.[y] > 0) {
      alert("已经有棋子了");
    } else {
      // 绘制棋子
      handleClick({ x, y });
    }
  };

  return (
    <div className="dom-board" style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }} ref={domRef}>
      {pieces?.map((x: number[], index: number) => {
        return (
          <div className="dom-board-x" key={"x" + index}>
            {x.map((y: number, index) => {
              return (
                <div className="dom-board-y" onClick={handleDomClick} key={"y" + index}>
                  {[0, 1, 2, 3].map((item) => (
                    <div key={"y" + y + item}></div>
                  ))}
                  {y !== PieceType.None && <img src={y === PieceType.A ? imageASrc : imageBSrc} alt="" />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CheckerBoardDom;
