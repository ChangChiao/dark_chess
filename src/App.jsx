import { useState, useEffect } from 'react'
import { CHESS_LIST, ROW, COL, combineChess } from "./utils"
import Chess from './component/Chess'
import './App.css'


function App() {
  const [count, setCount] = useState([]) //紀錄被吃掉的棋子
  const [active, setActive] = useState(-1) //紀錄被選中的格子
  const [trun, setTurn] = useState(1)//紀錄當前遊戲方
  const [player, setPlayer] = useState({player1:0,player2:0}) //紀錄紅黑方
  // const [upList, setUpList] = useState([]) //紀錄被翻過的棋子
  const [chess, setChess] = useState([]) //紀錄棋子位置
  const init = () => {
    setChess(combineChess())
  }
  useEffect(() => {
    init()
    console.log("start");
  }, []);

  const clickChess = (target) => {
    const copy = [...chess]
    const index = chess.findIndex(vo => vo.id === target )
    console.log("dde", index);
    copy[index] = { ...copy[index], isOpen:true }
    setChess(copy)
  }

  const decidePlayer = () => {

  }

  return (
    <div className="App h-screen flex justify-center items-center">
      <div className='flex border line'>
        {
          Array.from({ length: chess.length / ROW }).map((vo, i) => {
            return (
              <ul className='border-r line' key={'col' + i}>
                {
                  Array.from({ length: ROW }).map((item, j) => <Chess key={'row' + j} clickChess={clickChess} data={chess[i * ROW + j]} />)
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
