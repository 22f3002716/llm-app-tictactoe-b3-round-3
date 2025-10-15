document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const newGameButton = document.getElementById('new-game-button');

    function createBoard() {
        // Clear any existing cells
        gameBoard.innerHTML = '';

        // Create 16 cells for a 4x4 board
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('board-cell');
            // For this variation, let's just number the cells 1-16
            cell.textContent = i + 1;
            gameBoard.appendChild(cell);
        }
    }

    function resetGame() {
        createBoard();
        console.log('Board reset!');
    }

    // Initialize the board when the page loads
    createBoard();

    // Add event listener to the 'New Game' button
    newGameButton.addEventListener('click', resetGame);
});