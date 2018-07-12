import React from 'react';
import Player from '../util/Player';
import '../style/Board.css';
import Cross from './Cross';
import Nought from './Nought';

export default (props) => <div className={"board"}>
    {props.board.map((row, rowIndex) => <div className={"boardRow"} key={`row${rowIndex}`}>
        {row.map((cell, colIndex) =>
            <span className={"boardCell"} key={`cell${rowIndex}_${colIndex}`}
                  onClick={() => props.cellClicked(rowIndex, colIndex)}>
                {cell ? (cell === Player.CROSS ? <Cross/> : <Nought/>) : null}
            </span>
        )}
    </div>)}
</div>