const gameArea = document.getElementById('gameArea');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');
const scoreElement = document.getElementById('score');
const upButton = document.getElementById('upBtn');
const downButton = document.getElementById('downBtn');
const leftButton = document.getElementById('leftBtn');
const rightButton = document.getElementById('rightBtn');

let snake = [
    {x: 140, y: 100},
    {x: 120, y: 100},
    {x: 100, y: 100}
]
let food = {x: 0, y: 0};
let direction = {x: 20, y: 0};
let score = 0;
let foodTry = 0
let timeOut = 300;
let timerId = 0
let record = localStorage.getItem('record') || 0

gameArea.focus()
randomFoodPosition();
gameLoop();


function gameLoop() {
    if (checkCollision()) {
        gameOver();
        return;
    }
    updateSnake();
    scoreElement.textContent = "score: " + score + "  record: " + record;
    timerId = setTimeout(gameLoop, timeOut);
}


function randomFoodPosition() {
    if (foodTry >= 100) {
        gameOver()
        return;
    }
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
    for (const section of snake) {
        if (section.x === food.x && section.y === food.y) {
            foodTry++
            randomFoodPosition();
            return;
        }
    }
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    foodTry = 0
}

function updateSnake() {
    const newSnakeHead = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    if (newSnakeHead.x < 0) newSnakeHead.x = 380
    if (newSnakeHead.x >= 400) newSnakeHead.x = 0
    if (newSnakeHead.y < 0) newSnakeHead.y = 380
    if (newSnakeHead.y >= 400) newSnakeHead.y = 0
    snake.unshift(newSnakeHead);
    if (newSnakeHead.x === food.x && newSnakeHead.y === food.y) {
        score++;
        if (score > record) {
            record = score;
            localStorage.setItem('record', record)
        }
        timeOut = Math.floor(timeOut * 0.99)
        randomFoodPosition();
    } else {
        snake.pop();
    }
    renderSnake();
}

function renderSnake() {
    snakeElement.innerHTML = '';
    snake.forEach((segment, index) => {
        const snakePart = document.createElement('div');
        snakePart.className = 'snake';
        snakePart.style.left = segment.x + 'px';
        snakePart.style.top = segment.y + 'px';
        if (index === 0) snakePart.className += ' head'
        snakeElement.appendChild(snakePart);
    });
}


function gameOver() {
    alert('Game Over! Your score: ' + score);
    snake = [
        {x: 140, y: 100},
        {x: 120, y: 100},
        {x: 100, y: 100}
    ]
    direction = {x: 20, y: 0};
    score = 0;
    renderSnake();
    randomFoodPosition();
    gameLoop()
}

function checkCollision() {
    return snake.slice(3).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 20) {
                direction = {x: 0, y: -20};
            }
            break;
        case 'ArrowDown':
            if (direction.y !== -20) {
                direction = {x: 0, y: 20};
            }
            break;
        case 'ArrowLeft':
            if (direction.x !== 20) {
                direction = {x: -20, y: 0};
            }
            break;
        case 'ArrowRight':
            if (direction.x !== -20) {
                direction = {x: 20, y: 0};
            }
            break;
        case ' ':
            if (timerId) {
                clearTimeout(timerId)
                timerId = 0
            } else {
                gameLoop()
            }
            break
    }
});

upButton.addEventListener('click', () => {
    if (direction.y !== 20) {
        direction = {x: 0, y: -20};
    }
});

downButton.addEventListener('click', () => {
    if (direction.y !== -20) {
        direction = {x: 0, y: 20};
    }
});

leftButton.addEventListener('click', () => {
    if (direction.x !== 20) {
        direction = {x: -20, y: 0};
    }
});

rightButton.addEventListener('click', () => {
    if (direction.x !== -20) {
        direction = {x: 20, y: 0};
    }
});