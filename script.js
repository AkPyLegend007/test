document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const themeToggle = document.getElementById('themeToggle');
    const skinSelect = document.getElementById('skinSelect');
    // Scoreboard elements
    const playerXScoreDisplay = document.getElementById('playerXScore');
    const playerOScoreDisplay = document.getElementById('playerOScore');

    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let isDarkTheme = false;
    // Score variables
    let playerXScore = 0;
    let playerOScore = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

    statusDisplay.textContent = currentPlayerTurn();

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        //clickedCell.textContent = currentPlayer; // Remove text content
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = winMessage();
            gameActive = false;
            // Update score
            if (currentPlayer === 'X') {
                playerXScore++;
                playerXScoreDisplay.textContent = playerXScore;
            } else {
                playerOScore++;
                playerOScoreDisplay.textContent = playerOScore;
            }
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.textContent = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = currentPlayerTurn();
    }

    function handleResetGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.textContent = currentPlayerTurn();
        cells.forEach(cell => {
            //cell.textContent = ""; // Remove text content
            cell.classList.remove('x', 'o');
        });
    }

    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('dark-theme', isDarkTheme);
        themeToggle.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
    }

    function changeSkin(skin) {
        document.body.classList.remove('default', 'retro', 'neon');
        document.body.classList.add(skin);
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);
    themeToggle.addEventListener('click', toggleTheme);

    skinSelect.addEventListener('change', (event) => {
        const selectedSkin = event.target.value;
        changeSkin(selectedSkin);
    });

    changeSkin('default');
});
