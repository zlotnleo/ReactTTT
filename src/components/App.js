import React from 'react';
import '../style/App.css';
import Header from './Header';
import Board from './Board';
import BoardUtils from '../util/BoardUtils';
import Player from "../util/Player";
import ModeSelector from './ModeSelector'
import Mode from '../util/Mode';
import ConfirmDialog from "./ConfirmDialog";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            board: BoardUtils.initBoard(),
            currentPlayer: Player.CROSS,
            currentMode: Mode.TWO_PLAYERS,
            activeDialog: undefined,
            winState: undefined
        };
    }

    cellClicked(row, col) {
        this.setState((prevState) => {
            if (prevState.board[row][col]) {
                return {};
            }
            let newBoard = BoardUtils.copyBoard(prevState.board);
            newBoard[row][col] = prevState.currentPlayer;

            let winner = BoardUtils.getWinner(newBoard);
            console.log(winner);
            if(!winner) {
                return {
                    board: newBoard,
                    currentPlayer: prevState.currentPlayer === Player.CROSS ? Player.NOUGHT : Player.CROSS
                }
            }
            return {
                board: newBoard,
                currentPlayer: undefined,//prevState.currentPlayer,
                winState: winner
            }
        });
    }

    hideDialog() {
        this.setState(() => ({
            activeDialog: undefined
        }));
    }

    changeModeConfirmed(newMode) {
        this.setState(() => ({
            board: BoardUtils.initBoard(),
            currentMode: newMode,
            activeDialog: undefined,
            winState: undefined,
            currentPlayer: Player.CROSS
        }))
    }

    changeModeButtonClick(newMode) {
        this.setState((prevState) => {
            if (BoardUtils.isEmpty(prevState.board)) {
                return {
                    currentMode: newMode
                };
            } else {
                return {
                    activeDialog: <ConfirmDialog
                        question={"Do you want to change the mode? The current game will be lost."}
                        onCancel={this.hideDialog.bind(this)}
                        onConfirm={() => this.changeModeConfirmed(newMode)}
                    />
                };
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <ModeSelector
                    currentMode={this.state.currentMode}
                    disabled={this.state.activeDialog !== undefined}
                    setMode={this.changeModeButtonClick.bind(this)}
                />
                {this.state.currentMode === Mode.ONLINE
                    ? <h3>Coming soon!</h3>
                    : <Board
                        board={this.state.board}
                        cellClicked={this.cellClicked.bind(this)}
                        selectedSquares={this.state.winState ? this.state.winState.squares : undefined}
                    />
                }
                {this.state.activeDialog ? this.state.activeDialog : null}
            </div>
        );
    }
}

export default App;
