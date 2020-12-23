class Wolf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = WOLF_VALUE;
        this.directions = [];
    }

    skipOutOfBorders(direction) {
        const [x, y] = direction;
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

    getPossibleMovesByValue(value) {
        this.setNewDirections()
        return this.directions.filter(direction => {
            const [x, y] = direction;
            return matrix[y][x] == value;
        })
    }

    getCellIndexByValue(value) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == value) return [x, y];
            }
        }
    }

    calcDistance(enemyCell) {
        return (possibleCell) => {
            const [enemyX, enemyY] = enemyCell;
            const [possX, possY] = possibleCell;
            return Math.sqrt((enemyX - possX) ** 2 + (enemyY - possY) ** 2)
        }
    }

    calculateShortestDistance(cellValue) {
        const possibleCells = this.getPossibleMovesByValue(EMPTY_CELL_VALUE);
        const enemyCell = this.getCellIndexByValue(cellValue);

        if (possibleCells && enemyCell) {
            const distances = possibleCells.map(this.calcDistance(enemyCell));
            const indexOfMinValue = distances.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
            return possibleCells[indexOfMinValue];
        }
    }

    setChangeOnMatrix(newCell, dieValue = 0) {
        const [newX, newY] = newCell;
        matrix[newY][newX] = dieValue ? DIE_VALUE : this.value;
        matrix[this.y][this.x] = EMPTY_CELL_VALUE;
        this.x = newX;
        this.y = newY;
    }

    move() {
        const moveCell = this.calculateShortestDistance(RABBIT_VALUE);
        moveCell && this.setChangeOnMatrix(moveCell);
    }

    eat() {
        const eatingCell = random(this.getPossibleMovesByValue(RABBIT_VALUE));
        if (eatingCell) {
            this.setChangeOnMatrix(eatingCell, DIE_VALUE)
            alert("Game over");
        } else {
            this.move();
        }
    }
}