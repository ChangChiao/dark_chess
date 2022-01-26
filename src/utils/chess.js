import { ROW, COL } from './constant'

const normal = [[0, -1], [1, 0], [0, 1], [-1, 0]] //一般路徑
const bomb = [[0, -2], [2, 0], [0, 2], [-2, 0]] //砲路徑

export const getColor = (chess) => {
    return chess.substr(0, 1)
}

export const getLevel = (chess) => {
    return Number(chess.substr(1, 1))
}

const transXY = (index) => {
    return [ Math.floor(index / 8) , index % 8]
}

const transIndex = (x, y) => {
    return x * ROW + y
}


//檢查步伐是否合格
export const checkStep = (selfIndex, targetIndex, isBomb) => {
    const [x, y] = transXY(selfIndex)
    console.log("x, y", x, y);
    const path = isBomb ? bomb:normal
    const temp = path.map(vo=>{
        const [x1, y1] = vo
        //檢查是否超出邊界
        if(x + x1 < 0 || x + x1 >= COL ) return null
        if(y + y1 < 0 || y + y1 >= ROW ) return null
        return transIndex(x + x1, y + y1)
    })
    console.log("temp", temp);
    return temp.includes(targetIndex)
}

//檢查棋子是否能夠吃掉對方
export const checkCanEat = (self, target) => {
    const selfLevel = getLevel(self)
    const targetLevel = getLevel(target);
    if(selfLevel === 2) return true //炮
    if(selfLevel === 1 && targetLevel === 7) return true
    return selfLevel > targetLevel
}

