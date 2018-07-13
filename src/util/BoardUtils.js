import GameSettings from './GameSettings';

export default class {
    static initBoard() {
        let board = [];
        for (let row = 0; row < GameSettings.BOARD_HEIGHT; row++) {
            board[row] = [];
            for (let col = 0; col < GameSettings.BOARD_WIDTH; col++) {
                board[row][col] = undefined;
            }
        }
        return board;
    }

    static copyBoard(board) {
        let newBoard = [];
        for (let row = 0; row < board.length; row++) {
            newBoard[row] = [];
            for (let col = 0; col < board[row].length; col++) {
                newBoard[row][col] = board[row][col];
            }
        }
        return newBoard;
    }

    static isEmpty(board) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if(board[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }
}