document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;
    const BOARD_WIDTH = COLS * BLOCK_SIZE;
    const BOARD_HEIGHT = ROWS * BLOCK_SIZE;
    const GAME_SPEED = 500; // milliseconds
    const TICK_INTERVAL = 700; // Tick interval in milliseconds

    let board = [];
    let currentPiece;
    let requestId;
    let gameOver = false;
    let paused = false;

    let tickCounter = 0;
    let fallSpeed = 20; // The higher the value, the slower the piece falls



    init();

    function init() {
        for (let row = 0; row < ROWS; row++) {
            board[row] = [];
            for (let col = 0; col < COLS; col++) {
                board[row][col] = '';
            }
        }

        document.getElementById('startButton').addEventListener('click', startGame);
        document.getElementById('pauseButton').addEventListener('click', pauseGame);
        document.getElementById('resetButton').addEventListener('click', resetGame);

        draw();
    }

    function startGame() {
        if (!requestId && !gameOver) {
            resetGame();
            requestId = requestAnimationFrame(update);
        }
    }

    function pauseGame() {
        paused = !paused;
        if (paused) {
            cancelAnimationFrame(requestId);
        } else {
            requestId = requestAnimationFrame(update);
        }
    }

    function resetGame() {
        cancelAnimationFrame(requestId);
        board = [];
        currentPiece = null;
        gameOver = false;
        paused = false;
        init();
    }

    function draw() {
        ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        drawBoard();
        if (currentPiece) {
            drawPiece();
        }
    }

    function drawBoard() {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                drawBlock(col, row, board[row][col]);
            }
        }
    }

    function drawPiece() {
        currentPiece.shape.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell) {
                    drawBlock(currentPiece.x + j, currentPiece.y + i, currentPiece.color);
                }
            });
        });
    }

    function drawBlock(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    function update() {
        if (!paused) {
            tickCounter++;
            if (tickCounter >= fallSpeed) {
                tickCounter = 0;
                if (!currentPiece) {
                    currentPiece = generatePiece();
                }

                if (!movePiece(0, 1)) {
                    mergePiece();
                    currentPiece = null;
                    checkLines();
                    if (gameOver) {
                        return;
                    }
                }
            }

            draw();
            requestId = requestAnimationFrame(update);
        }
    }

    function generatePiece() {
        const pieces = [
            [[1, 1, 1, 1]], // I
            [[1, 1, 1], [1]], // J
            [[1, 1, 1], [0, 0, 1]], // L
            [[1, 1], [1, 1]], // O
            [[0, 1, 1], [1, 1]], // S
            [[1, 1, 0], [0, 1, 1]], // Z
            [[1, 1, 1], [0, 1]] // T
        ];

        const index = Math.floor(Math.random() * pieces.length);
        const shape = pieces[index];
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        const piece = {
            shape,
            color,
            x: Math.floor((COLS - shape[0].length) / 2),
            y: 0
        };

        return piece;
    }

    function movePiece(dx, dy) {
        currentPiece.x += dx;
        currentPiece.y += dy;

        if (collides()) {
            currentPiece.x -= dx;
            currentPiece.y -= dy;
            return false;
        }

        return true;
    }

    function collides() {
        return currentPiece.shape.some((row, i) => {
            return row.some((cell, j) => {
                if (cell) {
                    const nextX = currentPiece.x + j;
                    const nextY = currentPiece.y + i;
                    return (
                        nextX < 0 ||
                        nextX >= COLS ||
                        nextY >= ROWS ||
                        (nextY >= 0 && board[nextY][nextX])
                    );
                }
                return false;
            });
        });
    }

    function mergePiece() {
        currentPiece.shape.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell) {
                    const boardX = currentPiece.x + j;
                    const boardY = currentPiece.y + i;
                    if (boardY >= 0) {
                        board[boardY][boardX] = currentPiece.color;
                    }
                }
            });
        });
    }

    function checkLines() {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row].every(cell => cell)) {
                board.splice(row, 1);
                board.unshift(new Array(COLS).fill(''));
                row++;
            }
        }

        gameOver = board[0].some(cell => cell);
    }


});