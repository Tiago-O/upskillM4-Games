// Chess
// k=king, q=queen, r=rook, b=bishop, c=knight, p=pawn
let k; let q; let r; let b; let c; let p;
let board = [
    ['br', 'bc', 'bb', 'bq', 'bk', 'bb', 'bc', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wc', 'wb', 'wq', 'wk', 'wb', 'wc', 'wr'],
];

let location = [0, 6] // 'bc'
function possibleMove(location, piece) {

}
console.log(possibleMove(location, 'bc'))
