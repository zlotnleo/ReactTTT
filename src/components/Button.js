import React from 'react';
import '../style/Button.css';

export default (props) => <span
    className={`button ${props.selected ? "buttonActive" : ""} ${props.disabled ? "buttonDisabled": ""}`}
    onClick={props.disabled ? null : props.onClick}
>
    {props.text}
</span>