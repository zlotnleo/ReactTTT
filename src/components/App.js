import React from 'react';
import '../style/App.css';
import Header from './Header';
import Board from './Board';
import BoardUtils from '../util/BoardUtils';
import Player from "../util/Player";
import ModeSelector from './ModeSelector'
import Mode from '../util/Mode';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            board: BoardUtils.initBoard(),
            currentPlayer: Player.CROSS,
            anyMovesMade: false,
            currentMode: Mode.TWO_PLAYERS
        };
    }

    cellClicked(row, col) {
        this.setState((prevState, props) => {
            if(prevState.board[row][col]) {
                return {};
            }
            let newBoard = BoardUtils.copyBoard(prevState.board);
            newBoard[row][col] = prevState.currentPlayer;
            return {
                board: newBoard,
                anyMovesMade: true,
                currentPlayer: prevState.currentPlayer === Player.CROSS ? Player.NOUGHT : Player.CROSS
            }
        });
    }

    setMode(newMode) {
        this.setState((prevState) => {
            if(!prevState.anyMovesMade) {
                return {
                    currentMode: newMode
                };
            } else {
                // TODO: Dialog to confirm reset
                return {};
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <ModeSelector
                    currentMode={this.state.currentMode}
                    setMode={this.setMode.bind(this)}
                />
                <Board
                    board={this.state.board}
                    cellClicked={this.cellClicked.bind(this)}
                />
            </div>
        );
    }
}

export default App;
