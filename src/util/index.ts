/**
 * 根据当前落子判断是否赢
 * @param pieces  落子记录
 * @param curStep 当前落子坐标
 * @param curPlayer 玩家类型
 * @returns
 */
export function isGameOver(pieces: number[][], curStep: number[], curPlayer: number) {
  const [x, y] = curStep;
  let samePieceCount = 1;
  let searchLeft = true;
  let searchRight = true;
  // 1 水平线
  for (let i = 1; i < 5; i++) {
    if (searchLeft && pieces?.[x - i]?.[y] === curPlayer) {
      samePieceCount++;
    } else {
      searchLeft = false;
    }

    if (searchRight && pieces?.[x + i]?.[y] === curPlayer) {
      samePieceCount++;
    } else {
      searchRight = false;
    }
    if (!(searchLeft || searchRight)) {
      break;
    }

    if (samePieceCount >= 5) {
      return true;
    }
  }

  // 2 垂直线
  samePieceCount = 1;
  searchLeft = true;
  searchRight = true;
  for (let i = 1; i < 5; i++) {
    if (searchLeft && pieces?.[x]?.[y - i] === curPlayer) {
      samePieceCount++;
    } else {
      searchLeft = false;
    }

    if (searchRight && pieces?.[x]?.[y + i] === curPlayer) {
      samePieceCount++;
    } else {
      searchRight = false;
    }

    if (!(searchLeft || searchRight)) {
      break;
    }

    if (samePieceCount >= 5) {
      return true;
    }
  }

  // 3 第一三象限
  samePieceCount = 1;
  searchLeft = true;
  searchRight = true;
  for (let i = 1; i < 5; i++) {
    if (searchLeft && pieces?.[x + i]?.[y - i] === curPlayer) {
      samePieceCount++;
    } else {
      searchLeft = false;
    }

    if (searchRight && pieces?.[x - i]?.[y + i] === curPlayer) {
      samePieceCount++;
    } else {
      searchRight = false;
    }

    if (!(searchLeft || searchRight)) {
      break;
    }

    if (samePieceCount >= 5) {
      return true;
    }
  }

  // 4 第二四象限
  samePieceCount = 1;
  searchLeft = true;
  searchRight = true;
  for (let i = 1; i < 5; i++) {
    if (searchLeft && pieces?.[x - i]?.[y - i] === curPlayer) {
      samePieceCount++;
    } else {
      searchLeft = false;
    }

    if (searchRight && pieces?.[x + i]?.[y + i] === curPlayer) {
      samePieceCount++;
    } else {
      searchRight = false;
    }

    if (!(searchLeft || searchRight)) {
      break;
    }

    if (samePieceCount >= 5) {
      return true;
    }
  }

  return false;
}

export const deepClone = (arr: any) => {
  // 如果数组为空或只有一个元素，直接返回
  if (arr === null || arr.length === 0 || arr[0] === null || arr[0].length === 0) {
    return arr;
  }

  // 递归深拷贝数组的每一个元素
  const newArray = arr.map((item: any) => {
    if (typeof item === "object" && item !== null) {
      return deepClone(item);
    } else {
      return item;
    }
  });

  return newArray;
};
