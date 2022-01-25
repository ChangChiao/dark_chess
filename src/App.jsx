import { useState, useEffect } from 'react'
import { CHESS_LIST, 
  ROW, COL, combineChess, getColor, getLevel } from "./utils"
import Chess from './component/Chess'
import './App.css'


function App() {
  const [count, setCount] = useState([]) //紀錄被吃掉的棋子
  const [active, setActive] = useState(-1) //紀錄被選中的格子
  const [turn, setTurn] = useState(1)//紀錄當前遊戲方
  const [{ player1, player2 }, setPlayer] = useState({player1:null,player2:null}) //紀錄紅黑方
  // const [upList, setUpList] = useState([]) //紀錄被翻過的棋子
  const [chess, setChess] = useState([]) //紀錄棋子位置
  const init = () => {
    setChess(combineChess())
  }
  useEffect(() => {
    init()
    console.log("start");
  }, []);

  const clickChess = ({id, type, isOpen}) => {
      if(player1 === null){
        decidePlayer(type)
      }

      //是否開啟
      if(!isOpen){
        showChess(id)
        return
      }
        //檢查是否為己方棋子
      let isSelf = checkSelf(type)
      console.log("isSelf", isSelf);
      if(!isSelf) return
      //已被選取
      if(active === id) {
        setActive(-1)
      }else{
        setActive(id)
      }
      
      //點到空白處
      if(!id){
        
      }
  }

  const checkSelf = (type) => {
    console.log("turn", turn);
    let nowColor = turn === 1 ?　player1 : player2
    const chessType = getColor(type)
    return nowColor === chessType
  }

  const roundReset = () => {

  }
  
  const showChess = (id) => {
    const copy = [...chess]
    const index = chess.findIndex(vo => vo.id === id )
    copy[index] = { ...copy[index], isOpen:true }
    setChess(copy)
    setTurn(turn*-1)
  }

  const decidePlayer = (type) => {
    const color = getColor(type)
    console.log(type,33);
    color === "B" ?
    setPlayer({player1:'B',player2:'R'}):
    setPlayer({player1:'R',player2:'B'})
  }

  const transPlayer = (type) => {
      if(!type) return ''
      return type === 1 ? '黑方':'紅方'
  }

  return (
    <div className="App h-screen flex justify-center items-center">
      <ul className=" absolute top-8 text-xl">
        <li>玩家1:{transPlayer(player1) }</li>
        <li>玩家2:{transPlayer(player2)}</li>
        {
          player1 !==0 && <li>當前輪到 { turn === 1 ? '玩家1':'玩家2' }</li>
        }
      </ul>
      <div className='flex border line'>
        {
          Array.from({ length: chess.length / ROW }).map((vo, i) => {
            return (
              <ul className='border-r line' key={'col' + i}>
                {
                  Array.from({ length: ROW }).map((item, j) => <Chess key={'row' + j} clickChess={clickChess} isActive={active === chess[i * ROW + j].id} data={chess[i * ROW + j]} />)
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
