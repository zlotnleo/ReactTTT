import React from 'react';
import ModeButton from './ModeButton';
import Mode from '../util/Mode';
import '../style/ModeSelector.css';

export default (props) => <div className={"modeSelector"}>
    <ModeButton
        text={"Two players"}
        selected={props.currentMode === Mode.TWO_PLAYERS}
        onClick={() => props.setMode(Mode.TWO_PLAYERS)}
    />
    <ModeButton
        text={"1 Player vs AI"}
        selected={props.currentMode === Mode.ONE_PLAYER}
        onClick={() => props.setMode(Mode.ONE_PLAYER)}
    />
    <ModeButton
        text={"Online game"}
        selected={props.currentMode === Mode.ONLINE}
        onClick={() => props.setMode(Mode.ONLINE)}
    />
</div>

