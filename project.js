// Variables for board
var board = Array(9).fill(null);
var Xturn = true;
var winCell = [];
var winner = null;
var boardElement = document.getElementById('board');
var statusText = document.getElementById('status');
var resetBtn = document.getElementById('reset');
var playXBtn = document.getElementById('play-x');
var playOBtn = document.getElementById('play-o');
var choice = document.getElementById('player-choice');
// render the board
function renderBoard() {
    boardElement.innerHTML = ''; // clear the existing board
    board.forEach(function (cell, i) {
        var div = document.createElement('div'); //create new <div>
        div.classList.add('cell');
        if (winCell.includes(i)) { //checking cell index is winning
            div.classList.add('highlight'); // adding highlight class for styling
        }
        div.textContent = cell ? cell : ''; //set text :'x','o',''
        if (!winner && !cell) {
            div.addEventListener('click', function () { return handleClick(i); });
        }
        boardElement.appendChild(div); // add <div> to board 
    });
    if (winner) {
        statusText.textContent = "Winner : ".concat(winner);
    }
    else if (board.every(function (cell) { return cell !== null; })) {
        statusText.textContent = "Draw";
    }
    else {
        statusText.textContent = "Next: ".concat(Xturn ? 'X' : 'O');
    }
}
// Handle click a cell 
function handleClick(index) {
    if (board[index] || winner)
        return;
    board[index] = Xturn ? 'X' : 'O';
    Xturn = !Xturn;
    var result = calculateWinner(board);
    if (result) {
        winner = result.winner;
        winCell = result.indices;
    }
    renderBoard();
}
// calculte winner
function calculateWinner(squares) {
    var lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var _a = lines_1[_i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return { winner: squares[a], indices: [a, b, c] };
        }
    }
    return null;
}
// Reset the game 
function resetGame() {
    board = Array(9).fill(null);
    Xturn = true;
    winner = null;
    winCell = [];
    renderBoard();
}
//player choose to x
playXBtn.addEventListener('click', function () {
    Xturn = true;
    choice.style.display = 'none';
    renderBoard();
});
playOBtn.addEventListener('click', function () {
    Xturn = false;
    choice.style.display = 'none';
    renderBoard();
});
resetBtn.addEventListener('click', resetGame);
renderBoard();
