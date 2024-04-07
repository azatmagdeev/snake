export class SnakeSegment {

    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    checkWall(gameArea) {
        if (this.x < 0) this.x = gameArea.widthCells - 1
        if (this.x >= gameArea.widthCells) this.x = 0
        if (this.y < 0) this.y = gameArea.heigthCells - 1
        if (this.y >= gameArea.heigthCells) this.y = 0
    }
}