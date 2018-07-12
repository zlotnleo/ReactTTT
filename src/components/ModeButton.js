import React from 'react';

export default (props) => <span
    className={`modeButton ${props.selected ? "modeButtonActive" : ""}`}
    onClick={props.onClick}
>
    {props.text}
</span>