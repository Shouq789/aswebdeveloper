document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.board td');
    const message = document.querySelector('.message');
    const soundX = document.getElementById('soundX');
    const soundO = document.getElementById('soundO');
    const playerXWinSound = document.getElementById('playerXWinSound');
    const playerOWinSound = document.getElementById('playerOWinSound'); // Corrected

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to handle a cell being clicked
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        // Check if the cell is already filled or if the game is over
        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Update the game state
        gameBoard[clickedCellIndex] = currentPlayer;
        updateCell(clickedCell, currentPlayer);

        // Play sound effect
        if (currentPlayer === 'X') {
            playSoundX();
        } else {
            playSoundO();
        }

        // Check for a win
        if (checkWin()) {
            if (currentPlayer === 'X') {
                playPlayerXWinSound(); // Play player X win sound
                message.textContent = `Player X wins! Press Enter to reset.`;
            } else {
                playPlayerOWinSound(); // Play player O win sound
                message.textContent = `Player O wins! Press Enter to reset.`;
            }
            gameActive = false;
            return;
        }

        // Check for a draw
        if (!gameBoard.includes('')) {
            message.textContent = 'It\'s a draw! Press Enter to reset.';
            gameActive = false;
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Function to update cell with appropriate content
    function updateCell(cell, player) {
        if (player === 'X') {
            cell.innerHTML = '<i class="fas fa-user-secret"></i>'; // Hacker icon for X
            cell.style.color = 'red'; // Red color for X
        } else {
            cell.textContent = '😀'; // Smiley face for O
            cell.style.fontWeight = 'bold'; // Bold for O
            cell.style.color = 'green'; // Green color for O
        }
    }

    // Function to check for a win
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6] // Diagonal
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }

    // Reset game
    function resetGame() {
        cells.forEach(cell => {
            cell.innerHTML = ''; // Clear cell content
            cell.style.color = ''; // Reset cell color
            cell.style.fontWeight = ''; // Reset cell font weight
        });
        message.textContent = 'Player X\'s turn'; // Reset message
        currentPlayer = 'X'; // Reset current player
        gameBoard = ['', '', '', '', '', '', '', '', '']; // Reset game board
        gameActive = true; // Reset game active status
    }

    // Function to play sound for X
    function playSoundX() {
        soundX.currentTime = 0; // Reset sound to start
        soundX.play();
    }

    // Function to play sound for O
    function playSoundO() {
        soundO.currentTime = 0; // Reset sound to start
        soundO.play();
    }

    // Function to play sound for player X win
    function playPlayerXWinSound() {
        playerXWinSound.currentTime = 0; // Reset sound to start
        playerXWinSound.play();
    }

    // Function to play sound for player O win
    function playPlayerOWinSound() {
        playerOWinSound.currentTime = 0; // Reset sound to start
        playerOWinSound.play();
    }

    // Add event listeners to cells
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.style.fontSize = '40px'; // Prevent cell shrinking
    });

    // Add event listener for Enter key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !gameActive) {
            resetGame();
        }
    });
});

// JavaScript to toggle the visibility of the chat box
document.getElementById('chat-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    toggleChat();
});

// Function to toggle the visibility of the chat box
function toggleChat() {
    var chatBox = document.getElementById('chat-box');
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none'; // Toggle display
}
