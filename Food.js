import {cellWidth, gameAreaWidthCells} from "./Game.js";

export class Food {
    try = 0
    el = null;
    x = 0;
    y = 0

    constructor(game) {
        this.el = document.querySelector('#food');
        this.game = game
    }

    randomPosition(snake) {
        if (this.try >= 100) {
            this.game.over()
            return;
        }
        this.x = Math.floor(Math.random() * gameAreaWidthCells);
        this.y = Math.floor(Math.random() * gameAreaWidthCells);
        for (const section of snake) {
            if (section.x === this.x && section.y === this.y) {
                this.try++
                this.randomPosition(snake);
                return;
            }
        }
        this.el.style.left = this.x * cellWidth + 'px';
        this.el.style.top = this.y * cellWidth + 'px';
        this.try = 0
    }
}