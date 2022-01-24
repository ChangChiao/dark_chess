import { useState, useEffect } from 'react'
import './App.css'

const chessList = {
  R1: '兵',
  R2: '炮',
  R3: '傌',
  R4: '俥',
  R5: '相',
  R6: '仕',
  R7: '帥',
  B1: '卒',
  B2: '砲',
  B3: '馬',
  B4: '車',
  B5: '象',
  B6: '士',
  B7: '將',
}

const redChess = {
}

const blackChess = {

}

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

const row = 8;
const col = 4;

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

const combineChess = () => {
  const list = createChess(chessList)
  const finial = randomChess([], list)
  return finial;
}



const bigThan = () => {

}

function App() {
  const [count, setCount] = useState(0)
  const [trun, setTurn] = useState(1)
  const [chess, setChess] = useState([])
  const init = () => {
    setChess(combineChess())

  }
  useEffect(() => {
    init()
  }, []);

  return (
    <div className="App">
      <div className='flex'>
        {
          Array.from({ length: col }).map((vo, i) => {
            return (
              <ul className='' key={'col'+ i}>
                {
                  Array.from({ length: row }).map((item, j) => <li className=' w-6 h-6' key={'row'+ j}>{chessList[chess[i + j]]}</li>)
                }
              </ul>
            )
          })
        }
      </div>

    </div>
  )
}

export default App
