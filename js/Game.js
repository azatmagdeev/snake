import {Snake} from "./Snake.js";
import {Food} from "./Food.js";
import {GameArea} from "./GameArea.js";

const speedFactor = 15000;

export const scoreElement = document.getElementById('score');
const upButton = document.getElementById('upBtn');
const downButton = document.getElementById('downBtn');
const leftButton = document.getElementById('leftBtn');
const rightButton = document.getElementById('rightBtn');

export class Game {
    score = 0
    accelerationFactor = 0.98;
    record = localStorage.getItem('record') || 0
    timerId = 0

    constructor() {

        this.area = new GameArea()
        this.timeOut = speedFactor / (this.area.widthCells + this.area.heightCells)

        this.snake = new Snake(this)
        this.food = new Food(this)

        //this.food.randomPosition();
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
                case 'w':
                case 'W':
                case 'ArrowUp':
                    this.snake.direction.up()
                    break;
                case 's':
                case 'S':
                case 'ArrowDown':
                    this.snake.direction.down()
                    break;
                case'a':
                case'A':
                case 'ArrowLeft':
                    this.snake.direction.left()
                    break;
                case'd':
                case'D':
                case 'ArrowRight':
                    this.snake.direction.right()
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

        let x1, y1
        document.addEventListener('touchstart', (e) => {
            x1 = e.touches[0].clientX;
            y1 = e.touches[0].clientY;
        })
        document.addEventListener('touchmove', (e) => {
            if (!x1 || !y1) return;
            let x2 = e.touches[0].clientX;
            let y2 = e.touches[0].clientY;
            let xDiff = x2 - x1;
            let yDiff = y2 - y1;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    this.snake.direction.right()
                } else {
                    this.snake.direction.left()
                }
            } else {
                if (yDiff > 0) {
                    this.snake.direction.down()
                } else {
                    this.snake.direction.up()
                }
            }
            x1 = null;
            y1 = null;
        })
    }

    loop() {
        //debugger
        if (this.snake.checkCollision()) {
            this.over();
            return;
        }
        this.snake.update();
        scoreElement.textContent = "score: " + this.score + "  record: " + this.record;
        this.timerId = setTimeout(() => this.loop(), this.timeOut);
    }

    over() {
        alert('Game Over! Your score: ' + this.score);
        const game = new Game();
        game.loop();
        delete this;
    }

    updateScore() {
        this.score++;
        if (this.score > this.record) {
            this.record = this.score;
            localStorage.setItem('record', this.record.toString())
        }
        this.timeOut = Math.floor(this.timeOut * this.accelerationFactor)
    }
}