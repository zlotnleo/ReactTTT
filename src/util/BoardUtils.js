import GameSettings from './GameSettings';
import Player from "./Player";

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
                if (board[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    static checkHorizontal(board, player, winSquares) {
        let result = false;
        for (let row = 0; row < GameSettings.BOARD_HEIGHT; row++) {
            for (let col = 0; col <= GameSettings.BOARD_WIDTH - GameSettings.WIN_LENGTH; col++) {
                let curPlayer = board[row][col];
                if (curPlayer !== player) {
                    continue;
                }
                let dCol;
                for (dCol = 1; dCol < GameSettings.WIN_LENGTH; dCol++) {
                    if (board[row][col + dCol] !== curPlayer) {
                        break;
                    }
                }
                if (dCol === GameSettings.WIN_LENGTH) {
                    for (dCol = 0; dCol < GameSettings.WIN_LENGTH; dCol++) {
                        result = true;
                        winSquares[row][col + dCol] = true;
                    }
                }
            }
        }
        return result;
    }

    static checkVertical(board, player, winSquares) {
        let result = false;
        for (let col = 0; col < GameSettings.BOARD_WIDTH; col++) {
            for (let row = 0; row <= GameSettings.BOARD_HEIGHT - GameSettings.WIN_LENGTH; row++) {
                let curPlayer = board[row][col];
                if (curPlayer !== player) {
                    continue;
                }
                let dRow;
                for (dRow = 1; dRow < GameSettings.WIN_LENGTH; dRow++) {
                    if (board[row + dRow][col] !== curPlayer) {
                        break;
                    }
                }
                if (dRow === GameSettings.WIN_LENGTH) {
                    for (dRow = 0; dRow < GameSettings.WIN_LENGTH; dRow++) {
                        winSquares[row + dRow][col] = true;
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    static checkMainDiagonal(board, player, winSquares) {
        let result = false;
        for (let row = 0; row <= GameSettings.BOARD_HEIGHT - GameSettings.WIN_LENGTH; row++) {
            for (let col = 0; col <= GameSettings.BOARD_WIDTH - GameSettings.WIN_LENGTH; col++) {
                let curPlayer = board[row][col];
                if (curPlayer !== player) {
                    continue;
                }
                let d;
                for (d = 1; d < GameSettings.WIN_LENGTH; d++) {
                    if (board[row + d][col + d] !== curPlayer) {
                        break;
                    }
                }
                if (d === GameSettings.WIN_LENGTH) {
                    for (d = 0; d < GameSettings.WIN_LENGTH; d++) {
                        winSquares[row + d][col + d] = true;
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    static checkAntiDiagonal(board, player, winSquares) {
        let result = false;
        for (let row = GameSettings.BOARD_HEIGHT - 1; row >= GameSettings.WIN_LENGTH - 1; row--) {
            for (let col = 0; col <= GameSettings.BOARD_WIDTH - GameSettings.WIN_LENGTH; col++) {
                let curPlayer = board[row][col];
                if (curPlayer !== player) {
                    continue;
                }
                let d;
                for (d = 1; d < GameSettings.WIN_LENGTH; d++) {
                    if (board[row - d][col + d] !== curPlayer) {
                        break;
                    }
                }
                if (d === GameSettings.WIN_LENGTH) {
                    for (d = 0; d < GameSettings.WIN_LENGTH; d++) {
                        winSquares[row - d][col + d] = true;
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    static getWinner(board) {
        let winSquares = this.initBoard();
        let hasWon = {};

        for (let player of [Player.CROSS, Player.NOUGHT]) {
            hasWon[player] = this.checkHorizontal(board, player, winSquares);
            hasWon[player] = hasWon[player] | this.checkVertical(board, player, winSquares); // non short-circuiting or
            hasWon[player] = hasWon[player] | this.checkMainDiagonal(board, player, winSquares);
            hasWon[player] = hasWon[player] | this.checkAntiDiagonal(board, player, winSquares);
        }

        if (hasWon[Player.CROSS]) {
            if (hasWon[Player.NOUGHT]) {
                throw new Error("Both players won, something is very wrong");
            }
            return {
                player: Player.CROSS,
                squares: winSquares
            }
        }
        if(hasWon[Player.NOUGHT]) {
            return {
                player: Player.NOUGHT,
                squares: winSquares
            }
        }
        return undefined;
    }
}