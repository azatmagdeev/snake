export class GameArea {

    cellPixels = 20
    widthCells = 10
    heightCells = 20

    constructor() {
        this.el = document.getElementById('gameArea');
        // this.widthCells = Math.floor(window.innerWidth / this.cellPixels);
        // this.heightCells = Math.floor((window.innerHeight / this.cellPixels)/2);
        this.el.style.width = this.widthCells * this.cellPixels + 'px'
        this.el.style.height = this.heightCells * this.cellPixels + 'px'
        this.el.focus()
    }
}