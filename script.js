const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const newGameBtn = document.getElementById('new-game-btn');

let board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; // Flattened 1D array for 4x4 board
let currentPlayer = 'X';
let gameActive = true;
const winningConditions = [
    // Rows
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    // Columns
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    // Diagonals
    [0, 5, 10, 15], [3, 6, 9, 12]
];

// Initialize the board cells
function initializeGame() {
    gameBoard.innerHTML = ''; // Clear previous cells
    board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;

    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; // Store index for easy access
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return; // Cell already taken or game not active
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class for styling

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        let d = board[winCondition[3]];

        if (a === '' || b === '' || c === '' || d === '') {
            continue; // Not all cells in this condition are filled
        }
        if (a === b && b === c && c === d) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    let roundDraw = !board.includes('');
    if (roundDraw) {
        gameStatus.textContent = 'Game Draw!';
        gameActive = false;
        return;
    }

    // If no win or draw, switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

newGameBtn.addEventListener('click', initializeGame);

// Initial game setup when the page loads
initializeGame();