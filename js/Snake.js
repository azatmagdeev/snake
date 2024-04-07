import {Direction} from "./Direction.js" ;
import {SnakeSegment} from "./SnakeSegment.js" ;

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
            snakePart.style.left = segment.x * this.game.area.cellPixels + 'px';
            snakePart.style.top = segment.y * this.game.area.cellPixels + 'px';
            if (index === 0) snakePart.className += ' head'
            this.el.appendChild(snakePart);
        });
    }

    update() {

        const game = this.game
        const food = this.game.food

        const newSnakeHead = new SnakeSegment(
            this[0].x + this.direction.x,
            this[0].y + this.direction.y
        );
        newSnakeHead.checkWall(this.game.area)
        this.unshift(newSnakeHead);

        if (this.ateFood()) {
            game.updateScore()
            food.randomPosition();
        } else {
            this.pop();
        }
        this.render();
    }

    ateFood() {
        return this[0].x === this.game.food.x && this[0].y === this.game.food.y
    }

    checkCollision() {
        return this.slice(3).some(segment => segment.x === this[0].x && segment.y === this[0].y);
    }
}