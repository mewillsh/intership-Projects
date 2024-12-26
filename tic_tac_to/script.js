// script.js

const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Handle a player's move
function handleClick(index) {
  if (gameBoard[index] || !isGameActive) return;

  // Update the game board and display the current player's mark
  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Check for a winner
  const winner = checkWinner();
  if (winner) {
    celebrateWinner(winner);
    return;
  }

  // Check if it's a draw
  if (gameBoard.every(cell => cell !== '')) {
    status.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if the current player has won
function checkWinner() {
  return winningCombinations.find(combination => {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      highlightWinningCells(combination);
      return gameBoard[a]; // Return the winner (X or O)
    }
    return null;
  });
}

// Highlight the winning cells
function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add('winning-line'); // Add the glowing effect
  });
}

// Handle celebration
function celebrateWinner(winner) {
  isGameActive = false;
  status.textContent = `Player ${winner} wins!`;
  status.classList.add('winner'); // Add the winner text animation

  // Trigger confetti effect
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Add celebration animations
  status.classList.add('winner-celebrate');
  document.body.classList.add('celebration'); // Change background
}

// Reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  status.textContent = `Player X's turn`;
  status.classList.remove('winner', 'winner-celebrate');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-line'); // Remove the glowing effect
  });
  document.body.classList.remove('celebration'); // Remove confetti background
}

// Add event listeners to each cell
cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell.dataset.index));
});

// Reset button functionality
resetButton.addEventListener('click', resetGame);
