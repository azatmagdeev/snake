import {gameAreaWidthCells} from "./Game.js";

export class SnakeSegment {

    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    checkWall() {
        if (this.x < 0) this.x = gameAreaWidthCells - 1
        if (this.x >= gameAreaWidthCells) this.x = 0
        if (this.y < 0) this.y = gameAreaWidthCells - 1
        if (this.y >= gameAreaWidthCells) this.y = 0
    }
}