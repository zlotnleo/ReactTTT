import React from 'react';
import logo from '../img/logo.png';
import '../style/Header.css';

export default () => <div className={"header"}>
    <img src={logo} alt={"logo"} className={"headerLogo"}/>
    <span className={"headerText"}>Tic Tac Toe</span>
</div>