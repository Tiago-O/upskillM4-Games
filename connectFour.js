// jogo 4 em linha / Connect Four

let board = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];

// play: 0 - 6 (index)
// player: number 1 or number 2

function boardAfterPlay(board, player, iPlay) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][iPlay] === 0) {
            // player === 1 ? board[i][iPlay] = 1 : board[i][iPlay] = 2;
            // board[i][iPlay] = (player === 1 ? 1 : 2)
            board[i][iPlay] = player;
            let colRow = $(`#col_${iPlay}_row_${i}`);
            colRow.append(`<div class="ball-player-${player}"></div>`)

            console.log(board);

            let winner = victory(board);
            if (winner !== 0) {
                alert('player ' + winner + ' won!!');
                gameOver = true;
            } else if (fullBoard(board)) {
                alert('its a tie');
                gameOver = true;
            } else {
                player = nextToPlay(player);
            }

            return;
        }
    }
}

// return the winning player (1 or 2), 0 if no victory
function victory(board) {
    // lines
    for (let l = board.length - 1; l >= 0; l--) {
        for (let c = 0; c < 4; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l][c + 1] && board[l][c + 1] === board[l][c + 2] && board[l][c + 2] === board[l][c + 3]) {
                return board[l][c];
            }
        }
    }
    // columns
    for (let l = board.length - 1; l > board.length - 4; l--) {
        for (let c = 0; c < board[0].length; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l - 1][c] && board[l - 1][c] === board[l - 2][c] && board[l - 2][c] === board[l - 3][c]) {
                return board[l][c];
            }
        }
    }
    // up diagonals
    for (let l = 0; l < board.length - 4; l++) {
        for (let c = 0; c < board[0].length - 3; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l + 1][c + 1] && board[l + 1][c + 1] === board[l + 2][c + 2] && board[l + 2][c + 2] === board[l + 3][c + 3]) {
                return board[l][c];
            }
        }
    }
    // down diagonals
    for (let l = board.length - 3; l < board.length; l++) {
        for (let c = 0; c < board[0].length - 3; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l - 1][c + 1] && board[l - 1][c + 1] === board[l - 2][c + 2] && board[l - 2][c + 2] === board[l - 3][c + 3]) {
                return board[l][c];
            }
        }
    }
    // no victory
    return 0;
}

function fullBoard(board) {
    return !board[board.length - 1].includes(0);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomFirstPlayer() {
    return Math.floor(Math.random() * 2 + 1);
}

function nextToPlay(last) {
    return last === 1 ? 2 : 1;
}

// is it a new game?
function newGame(board) {
    board[0].forEach(function (el) {
        if (el !== 0) {
            return false;
        }
    });
    return true;
}

// GAME

let connectFourGrid = $('#connect-four-grid');
let gameOver = false;
let player;

if (newGame(board)) {
        player = randomFirstPlayer();
    } else {
        player = nextToPlay(player);
    }

// for das colunas
for (let i = 0; i < board[0].length; i++) {
    let col = $(`<div id="col_${i}" class="connect-four-col"></div>`);

    col.click(() => {
        if(!gameOver) {
            boardAfterPlay(board, player, i);
            player = nextToPlay(player);
        }
    });

    //for das linhas
    for (let j = board.length - 1; j >= 0; j--) {
        //append das row ao col
        col.append(`<div id="col_${i}_row_${j}" class="connect-four-row"></div>`)
    }
    // append da col com as rows
    connectFourGrid.append(col);
}
