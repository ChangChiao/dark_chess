import { ROW, COL } from "./constant";

const normal = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]; //一般路徑


export const getColor = (chess) => {
  return chess.substr(0, 1);
};

export const getLevel = (chess) => {
  return Number(chess.substr(1, 1));
};

const transXY = (index) => {
  return [Math.floor(index / 8), index % 8];
};

const transIndex = (x, y) => {
  return x * ROW + y;
};

//檢查步伐是否合格
export const checkStep = (selfIndex, targetIndex) => {
  const [x, y] = transXY(selfIndex);
  console.log("x, y", x, y);
  const temp = normal.map((vo) => {
    const [x1, y1] = vo;
    //檢查是否超出邊界
    if (x + x1 < 0 || x + x1 >= COL) return null;
    if (y + y1 < 0 || y + y1 >= ROW) return null;
    return transIndex(x + x1, y + y1);
  });
  return temp.includes(targetIndex);
};

export const checkBombStep = (selfIndex, targetIndex, panel) => {
  const [x, y] = transXY(selfIndex);
  const [x2, y2] = transXY(targetIndex);
  if (x !== x2 && y !== y2) return false;
  if (checkStep(selfIndex, targetIndex)) return //不可吃鄰近棋子
  if (x === x2) {
    let start = y - y2 > 0 ? y2 : y;
    let end = start === y ? y2 : y;
    for (let i = start; i < end; i++) {
        let target = transIndex(x, i);
        if(panel[target]) return true
    }
  }
  if (y === y2) {
    let start = x - x2 > 0 ? x2 : x;
    let end = start === x ? x2 : x;
    for (let i = start; i < end; i++) {
        let target = transIndex(i, y);
        if(panel[target]) return true
    }
  }
  return false
};

//檢查棋子是否能夠吃掉對方
export const checkCanEat = (self, target) => {
  const selfLevel = getLevel(self);
  const targetLevel = getLevel(target);
  if (selfLevel === 2) return true; //炮
  if (selfLevel === 1 && targetLevel === 7) return true; //兵吃相
  return selfLevel > targetLevel;
};
