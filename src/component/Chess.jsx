import React from 'react';
import clsx from 'clsx';
import { CHESS_LIST } from "../utils"
function Chess({ data:{id, type, isOpen}, clickChess, isActive}) {
    const handleClick = () => {
        console.log("id", id);
        const sendData = {
            id,
            type,
            isOpen
        }
        clickChess(sendData)
    }
    const isRed = type.substr(0, 1) === "R"
    return <li className={clsx("box", isActive && 'bg-yellow-200') } onClick={handleClick}>
        {
            isOpen ? 
            <span className={clsx("chess", isRed && 'text-red-700 border-red-700')}> 
                {CHESS_LIST[type]} 
            </span>:
            <span className={clsx("chess", "back")}></span> 
        }
        
    </li>
}

export default React.memo(Chess);

