// Variables for board

let board = Array(9).fill(null);
let Xturn = true;
let winCell = [];
let winner = null;

const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const playXBtn = document.getElementById('play-x');
const playOBtn = document.getElementById('play-o');
const choice = document.getElementById('player-choice');

// render the board
function renderBoard() {
    boardElement.innerHTML=''; // clear the existing board
    board.forEach((cell,i) => { // loop each cell in board 
        const div = document.createElement('div') //create new <div>
        div.classList.add('cell');

        if(winCell.includes(i)){ //checking cell index is winning
            div.classList.add('highlight'); // adding highlight class for styling
        }

        div.textContent = cell ? cell : '' ; //set text :'x','o',''

        if(!winner && !cell) {
        div.addEventListener('click',() => handleClick(i));
        }

        boardElement.appendChild(div); // add <div> to board 

    });

    if(winner) {
        statusText.textContent =`Winner : ${winner}`;
    } else if (board.every(cell => cell !== null)) {
        statusText.textContent =`Draw`;
    } else {
        statusText.textContent = `Next: ${Xturn ? 'X' : 'O'}`;
    }
}

// Handle click a cell 
function handleClick(index) {
    if(board[index] || winner) 
        return;
    board[index] = Xturn?  'X' : 'O'
    Xturn = !Xturn;

    const result = calculateWinner (board);
    if(result) {
        winner = result.winner;
        winCell = result.indices;
    }

    renderBoard();
}



// calculte winner

function calculateWinner(squares) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let [a,b,c] of lines) {
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return { winner: squares[a], indices: [a,b,c]};
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
playXBtn.addEventListener('click',() => {
    Xturn = true;
    choice.style.display = 'none';
    renderBoard();
});

playOBtn.addEventListener('click',() =>{
    Xturn = false;
    choice.style.display = 'none';
    renderBoard();
});

resetBtn.addEventListener('click',resetGame);

renderBoard();

