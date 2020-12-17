class Wolf {
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

    getPossibleMoves(value) {
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
                if (matrix[y][x] == value) {
                    return [x, y]
                }
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

        const possibleCells = this.getPossibleMoves(EMPTY_CELL_INDEX);
        const enemyCell = this.getCellIndexByValue(cellValue);

        if (possibleCells.length != 0 && enemyCell.length != 0) {
            const distances = possibleCells.map(this.calcDistance(enemyCell));
            var indexOfMinDinst = distances.indexOf(Math.min(...distances));
            return possibleCells[indexOfMinDinst]
        }
    };

    move() {
        let moveCell = this.calculateShortestDistance(RABBIT_INDEX);
        console.log(moveCell)
        if (moveCell && moveCell.length != 0) {
            let newX = moveCell[0];
            let newY = moveCell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }
}