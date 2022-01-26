import React from 'react';
import clsx from 'clsx';
import { CHESS_LIST } from "../utils"
function Chess({ data: { id, type, isOpen }, index, clickChess, isActive }) {
    const handleClick = () => {
        const sendData = {
            id,
            type,
            isOpen,
            index
        }
        clickChess(sendData)
    }
    const isRed = type.substr(0, 1) === "R"
    return <li className={clsx("box", isActive && 'bg-yellow-200')} onClick={handleClick}>
        {
            id ?
                isOpen ?
                    <span className={clsx("chess", isRed && 'text-red-700 border-red-700')}>
                        {CHESS_LIST[type]}
                    </span> :
                    <span className={clsx("chess", "back")}></span> : null
        }

    </li>
}

export default React.memo(Chess);

