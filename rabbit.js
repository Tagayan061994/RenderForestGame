class Rabbit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = RABBIT_VALUE;
        this.directions = [];
    }

    jumpOverBorders(direction) {
        const [x, y] = direction;
        if (x >= 0 && x < matrix.length && y < 0) {
            return [x, y + matrix.length];
        }
        else if (x >= 0 && x < matrix.length && y > matrix.length - 1) {
            return [x, y - matrix.length];
        }
        else if (y >= 0 && y < matrix.length && x < 0) {
            return [x + matrix.length, y];
        }
        else if (y >= 0 && y < matrix.length && x > matrix.length - 1) {
            return [x - matrix.length, y];
        }
        else {
            return [x, y];
        }
    }

    setLeftCordinate() {
        this.directions = [this.jumpOverBorders([this.x - 1, this.y])];
    }
    setRightCordinate() {
        this.directions = [this.jumpOverBorders([this.x + 1, this.y])];
    }
    setUpCordinate() {
        this.directions = [this.jumpOverBorders([this.x, this.y - 1])];
    }
    setDownCordinate() {
        this.directions = [this.jumpOverBorders([this.x, this.y + 1])];
    }

    getPossibleMoves(value, stepDirection) {
        stepDirection === 37 ? this.setLeftCordinate()
            : stepDirection === 38 ? this.setUpCordinate()
                : stepDirection === 39 ? this.setRightCordinate()
                    : stepDirection === 40 ? this.setDownCordinate() : null;
        return this.directions.filter(direction => {
            const [x, y] = direction;
            return matrix[y][x] == value;
        });
    }

    setChangeOnMatrix(newCell, winValue = 0) {
        const [newX, newY] = newCell;
        matrix[newY][newX] = winValue ? WIN_VALUE : this.value;
        matrix[this.y][this.x] = EMPTY_CELL_VALUE;
        this.x = newX;
        this.y = newY;
    }

    move(keyCode) {
        const emptyCell = random(this.getPossibleMoves(EMPTY_CELL_VALUE, keyCode))
        emptyCell && this.setChangeOnMatrix(emptyCell)
        this.isWin()
    }

    isWin() {
        const homeCell = random(this.getPossibleMoves(HOME_VALUE, keyCode))
        if (homeCell) {
            this.setChangeOnMatrix(homeCell, WIN_VALUE);
            alert("You win the Game, please restart the game")
        }
    }

}