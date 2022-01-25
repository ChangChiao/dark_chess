import { random, CHESS_LIST } from "./index"
import { v4 as uuidv4 } from 'uuid';
const basicSetting = () => {
  let arr = Object.keys(CHESS_LIST)
  arr = arr.map((vo, i) => { 
    return {id: uuidv4(), type: vo, isOpen: false} 
  })
  return arr
}

const createReapeat = (count, item) => {
  let temp = []
  for( let i=0;i<count;i++){
    temp.push({...item, id: uuidv4()})
  }
  return temp
}

const createChess = () => {
    let empty = []
    const arr = basicSetting()
    arr.forEach(item => {
      const level = item.type.substr(1, 1)
      if (level === '7') {
        empty = empty.concat(createReapeat(1, item))
      } else if (level === '1') {
        empty = empty.concat(createReapeat(5, item))
      } else {
        empty = empty.concat(createReapeat(2, item))
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
    const list = createChess()
    const finial = randomChess([], list)
    console.log("eeee", finial);
    return finial;
  }