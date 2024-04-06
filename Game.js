import {Snake} from "./Snake.js";
import {Food} from "./Food.js";




export const initialTimeout = 300

export const cellWidth = 20;
export const gameAreaWidthCells = Math.floor(window.innerWidth/cellWidth)/2;

export const gameArea = document.getElementById('gameArea');
export const scoreElement = document.getElementById('score');
const upButton = document.getElementById('upBtn');
const downButton = document.getElementById('downBtn');
const leftButton = document.getElementById('leftBtn');
const rightButton = document.getElementById('rightBtn');

export class Game {
    score = 0
    timeOut = initialTimeout;
    accelerationFactor = 0.99;
    record = localStorage.getItem('record') || 0
    timerId = 0
    snake;

    constructor() {

        this.snake = new Snake(this)
        this.food = new Food(this)

        gameArea.style.width = gameAreaWidthCells*cellWidth + 'px'
        gameArea.style.height = gameAreaWidthCells*cellWidth + 'px'
        gameArea.focus()
        this.food.randomPosition(this.snake);
        this.listeners()
    }

    listeners() {
        upButton.addEventListener('click', () => {
            this.snake.direction.up()
        });

        downButton.addEventListener('click', () => {
            this.snake.direction.down()
        });

        leftButton.addEventListener('click', () => {
            this.snake.direction.left()
        });

        rightButton.addEventListener('click', () => {
            this.snake.direction.right()
        });

        document.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.snake.direction.y !== 1) {
                        this.snake.direction.set(0, -1)
                    }
                    break;
                case 'ArrowDown':
                    if (this.snake.direction.y !== -1) {
                        this.snake.direction.set(0, 1)
                    }
                    break;
                case 'ArrowLeft':
                    if (this.snake.direction.x !== 1) {
                        this.snake.direction.set(-1, 0)
                    }
                    break;
                case 'ArrowRight':
                    if (this.snake.direction.x !== -1) {
                        this.snake.direction.set(1, 0)
                    }
                    break;
                case ' ':
                    if (this.timerId) {
                        clearTimeout(this.timerId)
                        this.timerId = 0
                    } else {
                        this.loop()
                    }
                    break
            }
        });
    }

    loop() {
        //debugger
        if (this.snake.checkCollision()) {
            this.over();
            return;
        }
        this.snake.update(this.food);
        scoreElement.textContent = "score: " + this.score + "  record: " + this.record;
        this.timerId = setTimeout(() => this.loop(), this.timeOut);
    }

    over() {
        alert('Game Over! Your score: ' + this.score);
        this.snake = new Snake()
        this.snake.direction.set(1, 0);
        this.score = 0;
        this.timeOut = initialTimeout;
        this.snake.render();
        this.food.randomPosition(this.snake);
        this.loop()
    }
}