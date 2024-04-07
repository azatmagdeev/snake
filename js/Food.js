export class Food {
    try = 0
    el = null;
    x = 0;
    y = 0

    constructor(game) {
        this.el = document.querySelector('#food');
        this.game = game
        this.randomPosition()
    }

    randomPosition() {
        if (this.try >= 100) {
            this.game.over()
            return;
        }
        this.x = Math.floor(Math.random() * this.game.area.widthCells);
        this.y = Math.floor(Math.random() * this.game.area.heightCells);
        for (const section of this.game.snake) {
            if (section.x === this.x && section.y === this.y) {
                this.try++
                this.randomPosition();
                return;
            }
        }
        this.el.style.left = this.x * this.game.area.cellPixels + 'px';
        this.el.style.top = this.y * this.game.area.cellPixels + 'px';
        this.try = 0
    }
}