let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleMove(index));
    boardElement.appendChild(cellDiv);
  });
  updateStatus();
}

function handleMove(index) {
  if (board[index] === '' && !gameOver) {
    board[index] = currentPlayer;
    if (checkWin()) {
      statusElement.textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
    } else if (board.every(cell => cell !== '')) {
      statusElement.textContent = "It's a draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
    renderBoard();
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function updateStatus() {
  if (!gameOver) {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
}

renderBoard();
