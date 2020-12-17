class Rabbit {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];
    }

    skipOutOfBorders(direction) {
        const x = direction[X];
        const y = direction[Y];
        return x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length
    }

    setNewDirections() {
        this.directions = [
            [this.x - 1, this.y],
            [this.x, this.y - 1],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
        ].filter(this.skipOutOfBorders);
    }


    setLeftCordinate() {
        this.directions = [
            [this.x - 1, this.y],
        ];
    }
    setRightCordinate() {
        this.directions = [
            [this.x + 1, this.y],
        ];
    }

    setUpCordinate() {
        this.directions = [
            [this.x, this.y - 1],
        ];
    }

    setDownCordinate() {
        this.directions = [
            [this.x, this.y + 1],
        ];
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

    move(keyCode) {
        let emptyCell = random(this.getPossibleMoves(EMPTY_CELL_INDEX, keyCode))
        if (emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.isGameOver()
        }
    }

    isGameOver() {
        for (let i in wolfArr) {
            if (this.x === wolfArr[i].x && this.y === wolfArr[i].y) {
                alert("Game over")
            }
        }
    }
}