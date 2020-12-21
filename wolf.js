class Wolf {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
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

    getPossibleMovesByValue(value) {
        this.setNewDirections()
        return this.directions.filter(direction => {
            const x = direction[X];
            const y = direction[Y];
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
            let enemyX = enemyCell[X];
            let enemyY = enemyCell[Y];

            let possX = possibleCell[X];
            let possY = possibleCell[Y];
            return Math.sqrt((enemyX - possX) ** 2 + (enemyY - possY) ** 2)
        }
    }

    calculateShortestDistance(cellValue) {
        const possibleCells = this.getPossibleMovesByValue(EMPTY_CELL_VALUE);
        const enemyCell = this.getCellIndexByValue(cellValue);

        if (possibleCells && possibleCells.length != 0 && enemyCell && enemyCell.length != 0) {
            const distances = possibleCells.map(this.calcDistance(enemyCell));
            let indexOfMinDinst = distances.indexOf(Math.min(...distances));
            return possibleCells[indexOfMinDinst];
        }
    }

    setChangeOnMatrix(newCell) {
        const newX = newCell[X];
        const newY = newCell[Y];
        matrix[newY][newX] = this.value;
        matrix[this.y][this.x] = EMPTY_CELL_VALUE;
        this.x = newX;
        this.y = newY;
    }

    move() {
        const moveCell = this.calculateShortestDistance(RABBIT_VALUE);
        if (moveCell && moveCell.length != 0) this.setChangeOnMatrix(moveCell)
    }

    eat() {
        const eatingCell = this.getPossibleMovesByValue(RABBIT_VALUE);
        if (eatingCell && eatingCell.length != 0) {
            this.setChangeOnMatrix(eatingCell[0])
            // alert("Game over");
        } else {
            this.move();
        }
    }
}