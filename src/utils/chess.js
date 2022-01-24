import Chess from "../component/Chess"

const normal = [[0, -1], [1, 0], [0, 1], [-1, 0]] //一般路徑
const bomb = [[0, -2], [2, 0], [0, 2], [-2, 0]] //砲路徑

export const getColor = (chess) => {
    return chess.substr(0, 1)
}

export const getLevel = (chess) => {
    return chess.substr(1, 1)
}


//檢查是否超出邊界
const checkBoundary = () => {

}

//檢查是否翻過面
const checkCover = () => {

}

//檢查步伐是否合格
const checkStep = () => {
    //是否已翻面
}

//檢查棋子是否能夠吃掉對方
const checkCanEat = (self, target) => {
    const selfLevel = getLevel(self)
    const targetLevel = getLevel(target);
    if(selfLevel === "1" && targetLevel === "7") return true
    return selfLevel > targetLevel
}

//消滅該棋子並計數
const destoryChess = () => {

}

//移動格子