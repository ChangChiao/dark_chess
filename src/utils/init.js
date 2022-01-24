import { random, CHESS_LIST } from "./index"

const createChess = (obj) => {
    let empty = []
    const arr = Object.keys(obj)
    arr.forEach(item => {
      const level = item.substr(1, 1)
      if (level === '7') {
        empty.push(item)
      } else if (level === '1') {
        empty = empty.concat([item, item, item, item, item])
      } else {
        empty = empty.concat([item, item])
      }
    })
    return empty
  }


  const randomChess = (all, chess) => {
    const num = random(0, chess.length - 1)
    const [target] = chess.splice(num, 1)
    all.push(target)
    if (chess.length > 0) {
      randomChess(all, chess)
    }
    return all
  
  }
  
  export const combineChess = () => {
    const list = createChess(CHESS_LIST)
    const finial = randomChess([], list)
    return finial;
  }