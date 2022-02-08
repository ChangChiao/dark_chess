import { useState, useEffect } from 'react'
import {
  checkStep,
  checkBombStep,
  checkCanEat,
  ROW, COL, combineChess, getColor, getLevel
} from "./utils"
import Chess from './component/Chess'
import './App.css'
import clsx from 'clsx'


function App() {
  const [count, setCount] = useState({ B: 0, R: 0 }) //紀錄被吃掉的棋子
  const [active, setActive] = useState(null) //紀錄被選中的格子
  const [turn, setTurn] = useState(1)//紀錄當前遊戲方
  const [{ player1, player2 }, setPlayer] = useState({ player1: null, player2: null }) //紀錄紅黑方
  const [chess, setChess] = useState([]) //紀錄棋子位置
  const init = () => {
    setChess(combineChess())
    setCount({ B: 0, R: 0 })
    setTurn(1)
  }
  useEffect(() => {
    init()
    console.log("start");
  }, []);

  useEffect(() => {
    console.warn("chess", chess);
  }, [chess]);

  useEffect(() => {
    console.log(count);
    if (count.B >= 16) {
      alert("紅方勝利")
      init()
    }
    if (count.R >= 16) {
      alert("黑方勝利")
      init()
    }
  }, [count]);

  const clickChess = ({ id, type, isOpen, index }) => {
    if (player1 === null) {
      decidePlayer(type)
    }

    if (!isOpen) {
      !active && showChess(index)
      return
    }

    //被點擊的棋子是否開啟


    // if(active && !isOpen) return
    let isSelf = checkSelf(type)
    if (!active) {
      //檢查是否為己方棋子
      if (!isSelf) return
      console.log("setting!!!");
      setActive({ id, type, isOpen, index })
      return
    }

    //點擊已選取的格子
    if (active.id === id) {
      setActive(null)
      return
    }
    console.log("8777777", id);
    //是否選擇第二個棋子
    if (active.id !== id) {
      if (isSelf) return
      // const selfIndex = findChessIndex(active.id);
      // const targetIndex = index ?? findChessIndex(id);
      const selfIndex = active.index;
      const targetIndex = index;
      const isBomb = getLevel(active.type) === 2;
      //點到空白處
      console.warn("selfIndex", selfIndex);
      console.warn("targetIndex", targetIndex);
      let isCanMove = !isBomb ? checkStep(selfIndex, targetIndex): checkBombStep(selfIndex, targetIndex, chess)
      if (!isCanMove) return
      if (!id) {
        console.log("no-id");
        moveChess(selfIndex, targetIndex)
      } else {
        console.log("isBomb", isBomb);
        console.log(checkCanEat(active.type, type), "checkCanEat");
        if (checkCanEat(active.type, type)) {
          moveChess(selfIndex, targetIndex)
          eatChess(type)
        }
      }
      setTurn(turn * -1)
      setActive(null)
    }

  }

  const checkSelf = (type) => {
    console.log("turn", turn);
    let nowColor = turn === 1 ? player1 : player2
    const chessType = getColor(type)
    return nowColor === chessType
  }

  const findChessIndex = (id) => {
    return chess.findIndex(vo => vo.id === id)
  }

  const moveChess = (selfIndex, targetIndex) => {
    let temp = [...chess];
    temp[targetIndex] = temp[selfIndex];
    temp[selfIndex] = { id: "", type: "", isOpen: true, index:selfIndex }
    setChess(temp)
    console.warn('temp[targetIndex]', temp[targetIndex]);
    console.warn("temp[selfIndex]", temp[selfIndex]);
  }


  const showChess = (index) => {
    const copy = [...chess]
    copy[index] = { ...copy[index], isOpen: true }
    setChess(copy)
    setTurn(turn * -1)
  }

  const decidePlayer = (type) => {
    const color = getColor(type)
    console.log(type, 33);
    color === "B" ?
      setPlayer({ player1: 'B', player2: 'R' }) :
      setPlayer({ player1: 'R', player2: 'B' })
  }

  const eatChess = (type) => {
    const color = getColor(type)
    const temp = { ...count }
    color === "B" && temp.B++
    color === "R" && temp.R++
    setCount(temp);
  }

  const transPlayer = (type) => {
    if (!type) return ''
    return type === "B" ? '黑方' : '紅方'
  }

  const transColor = (type) => {
    if (!type) return ''
    return type === "B" ? 'bg-black' : 'bg-red-600'
  }

  return (
    <div className="App h-screen flex justify-center items-center">
      <ul className=" absolute top-8 text-xl">
        <li>玩家1:{transPlayer(player1)}</li>
        <li>玩家2:{transPlayer(player2)}</li>
        {
          player1 !== 0 && <li className='flex'>當前輪到 {turn === 1 ? '玩家1' : '玩家2'}
            <span className={clsx('dot', turn === 1 ? transColor(player1) : transColor(player2))}></span>
          </li>
        }
      </ul>
      <div className='flex border line'>
        {
          Array.from({ length: chess.length / ROW }).map((vo, i) => {
            return (
              <ul className='border-r line' key={'col' + i}>
                {
                  Array.from({ length: ROW }).map((item, j) => <Chess key={'row' + j} clickChess={clickChess} isActive={active?.id === chess[i * ROW + j].id} index={i * ROW + j} data={chess[i * ROW + j]} />)
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
