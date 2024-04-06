export class Direction {

    x = 1
    y = 0

    set(x, y) {
        this.x = x
        this.y = y
    }

    up() {
        if (this.y !== 1) {
            this.set(0, -1)
        }
    }

    down(){
        if (this.y !== -1) {
            this.set(0, 1)
        }
    }

    left(){
        if (this.x !== 1) {
            this.set(-1, 0)// = {x: -1, y: 0};
        }
    }

    right() {
        if (this.x !== -1) {
            this.set(1, 0)// = {x: 20, y: 0};
        }
    }
}