import React from 'react';
import clsx from 'clsx';
import { CHESS_LIST } from "../utils"
function Chess({ data }) {
    const isRed = data.substr(0, 1) === "R"
    return <li className="box">
        <span className={clsx("chess", isRed && 'text-red-700 border-red-700')}> {CHESS_LIST[data]} </span>
    </li>
}

export default Chess;
