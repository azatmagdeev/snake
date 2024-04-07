export class GameArea {

    cellPixels = 20

    constructor() {
        this.el = document.getElementById('gameArea');
        this.widthCells = Math.floor(window.innerWidth / this.cellPixels);
        this.heigthCells = Math.floor((window.innerHeight / this.cellPixels)/2);

        this.el.style.width = this.widthCells * this.cellPixels + 'px'
        this.el.style.height = this.heigthCells * this.cellPixels + 'px'
        this.el.focus()
    }
}