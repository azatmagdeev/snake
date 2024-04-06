import {Direction} from "./Direction.js" ;
import {SnakeSegment} from "./SnakeSegment.js" ;
import {cellWidth} from "./Game.js" ;

export class Snake extends Array {
    el;
    direction = new Direction();

    constructor(game) {
        super();
        this.el = document.querySelector('#snake')
        this[0] = new SnakeSegment(7, 5);
        this[1] = new SnakeSegment(6, 5);
        this[2] = new SnakeSegment(5, 5);
        this.game = game
    }


    render() {
        this.el.innerHTML = '';
        this.forEach((segment, index) => {

            const snakePart = document.createElement('div');
            snakePart.className = 'snake';
            snakePart.style.left = segment.x * cellWidth + 'px';
            snakePart.style.top = segment.y * cellWidth + 'px';
            if (index === 0) snakePart.className += ' head'
            this.el.appendChild(snakePart);
        });
    }

    update(food) {
        const newSnakeHead = new SnakeSegment(
            this[0].x + this.direction.x,
            this[0].y + this.direction.y
        );
        newSnakeHead.checkWall()
        this.unshift(newSnakeHead);
        if (newSnakeHead.x === food.x && newSnakeHead.y === food.y) {
            this.game.score++;
            if (this.game.score > this.game.record) {
                this.game.record = this.game.score;
                localStorage.setItem('record', this.game.record.toString())
            }
            this.game.timeOut = Math.floor(this.game.timeOut * this.game.accelerationFactor)
            food.randomPosition(this);
        } else {
            this.pop();
        }
        this.render();
    }

    checkCollision() {
        return this.slice(3).some(segment => segment.x === this[0].x && segment.y === this[0].y);
    }
}