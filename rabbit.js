class Rabbit {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.directions = [];
    }

    skipOutOfBorders(direction) {
        let x = direction[X];
        let y = direction[Y];
        if (x >= 0 && x < matrix[0].length && y < 0) return [x, y + matrix.length];
        else if (x >= 0 && x < matrix[0].length && y > matrix.length - 1) return [x, y - matrix.length];
        else if (y >= 0 && y < matrix.length && x < 0) return [x + matrix.length, y];
        else if (y >= 0 && y < matrix.length && x > matrix.length - 1) return [x - matrix.length, y];
        else return [x, y];
    }

    setLeftCordinate() {
        this.directions = [
            [this.x - 1, this.y],
        ].map(this.skipOutOfBorders);
    }

    setRightCordinate() {
        this.directions = [
            [this.x + 1, this.y],
        ].map(this.skipOutOfBorders);
    }

    setUpCordinate() {
        this.directions = [
            [this.x, this.y - 1],
        ].map(this.skipOutOfBorders);
    }

    setDownCordinate() {
        this.directions = [
            [this.x, this.y + 1],
        ].map(this.skipOutOfBorders);
    }

    getPossibleMoves(value, stepDirection) {
        stepDirection === "Up" ? this.setUpCordinate()
            : stepDirection === "Down" ? this.setDownCordinate()
                : stepDirection === "Left" ? this.setLeftCordinate()
                    : stepDirection === "Right" ? this.setRightCordinate() : null;
        return this.directions.filter(direction => {
            const x = direction[X];
            const y = direction[Y];
            return matrix[y][x] == value;
        })
    }

    setChangeOnMatrix(newCell) {
        const newX = newCell[X];
        const newY = newCell[Y];
        matrix[newY][newX] = this.value;
        matrix[this.y][this.x] = EMPTY_CELL_VALUE;
        this.x = newX;
        this.y = newY;
    }

    move(keyCode) {
        let emptyCell = random(this.getPossibleMoves(EMPTY_CELL_VALUE, keyCode))
        if (emptyCell) this.setChangeOnMatrix(emptyCell)
    }
}