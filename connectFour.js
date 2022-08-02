// jogo 4 em linha / Connect Four

let board =[
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
    for (let i = board.length - 1; i > 0; i--) {
        if (board[i][iPlay] === 0) {
            player === 1 ? board[i][iPlay] = 1 : board[i][iPlay] = 2;
            return board;
        }
    }
}

// return [victory (true/false), victor player (if victory true)]
function victory(board) {
    // lines
    board.forEach(function (line) {
        for (let c = 0; c < line.length - 3; c++) {
            if (line[c] !== 0 && line[c] === line[c + 1] && line[c + 1] === line[c + 2] && line[c + 2] === line[c + 3]) {
                return line[c];
            }
        }
    });
    // columns
    for (let l = board.length - 1; l > 0; l--) {
        for (let c = 0; c < board[0].length; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l - 1][c] && board[l - 1][c] === board[l - 2][c] && board[l - 2][c] === board[l - 3][c]) {
                return board[l][c];
            }
        }
    }
    // up diagonals
    for (let l = board.length - 1; l > board[0].length - 4; l--) {
        for (let c = 0; c < board[0].length - 3; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l - 1][c + 1] && board[l - 1][c + 1] === board[l - 2][c + 2] && board[l - 2][c + 2] === board[l - 3][c + 3]) {
                return board[l][c];
            }
        }
    }
    // down diagonals
    for (let l = board.length - 4; l > 0; l--) {
        for (let c = 0; c < board[0].length - 3; c++) {
            if (board[l][c] !== 0 && board[l][c] === board[l + 1][c + 1] && board[l + 1][c + 1] === board[l + 2][c + 2] && board[l + 2][c + 2] === board[l + 3][c + 3]) {
                return board[l][c];
            }
        }
    }
    // no victory
    return 0;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomFirstPlayer() {
    return Math.floor(Math.random() * 2 + 1);
}
// let playNow = randomFirstPlayer();
// console.log(playNow);

function nextToPlay(last) {
    if (last === 1) {
        return 2;
    } else {
        return 1;
    }
}
// console.log(nextToPlay(playNow));

/*
let a = board;
boardAfterPlay(a, 1, 3);
console.log(a);
console.log('------');
boardAfterPlay(a, 2, 2);
console.log(a);
console.log('------');
boardAfterPlay(a, 1, 3);
console.log(a);
console.log('------');
boardAfterPlay(a, 1, 3);
console.log(a);
console.log('------');
console.log(victory(a)); // [ false ]
boardAfterPlay(a, 1, 3);
console.log(a);
console.log('------');
console.log(victory(a)); // [ true, 1 ]
 */

/*
let b =[
    [2,0,0,0,0,0,0],
    [0,1,0,0,0,0,0],
    [0,0,2,0,0,0,0],
    [0,0,0,2,0,0,0],
    [0,0,0,0,2,0,0],
    [0,0,0,0,0,2,0]
];
console.log('------');
console.log(victory(b)); // [ true, 2 ]
 */

// is it a new game?
function newGame(board) {
    board[board.length - 1].forEach(function (el) {
        console.log(el);
        if (el !== 0) {
            return false;
        }
    });
    return true;
}
console.log(newGame(board));
console.log(newGame(b));


// GAME
function game(board) {

    console.log(board);

    if (newGame(board)) {
        let player = randomFirstPlayer();
    } else {
        nextToPlay(player);
    }

    console.log('player ' + player + ': make your move [index 0-6]:')

    // player input = iPlay

    board = boardAfterPlay(board, player, iPlay);

    if (victory(board) !== 0) {
        return 'player ' + victory(board) + ' won!!';
    } else {
        game(board);
    }
}
