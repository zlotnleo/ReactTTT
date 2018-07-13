import React from 'react';
import ModeButton from './Button';
import Mode from '../util/Mode';
import '../style/ModeSelector.css';

export default (props) => <div className={"modeSelector"}>
    <ModeButton
        disabled={props.disabled}
        text={"Two players"}
        selected={props.currentMode === Mode.TWO_PLAYERS}
        onClick={() => props.setMode(Mode.TWO_PLAYERS)}
    />
    <ModeButton
        disabled={props.disabled}
        text={"1 Player vs AI"}
        selected={props.currentMode === Mode.ONE_PLAYER}
        onClick={() => props.setMode(Mode.ONE_PLAYER)}
    />
    <ModeButton
        disabled={props.disabled}
        text={"Online game"}
        selected={props.currentMode === Mode.ONLINE}
        onClick={() => props.setMode(Mode.ONLINE)}
    />
</div>

