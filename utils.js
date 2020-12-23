//genereted random number
function getRandom(max) {
    return Math.floor(Math.random() * max)
}

//get random free cell from matrix recursively
function getRandomFreeCell(matrix) {
    const [x, y] = [getRandom(matrix.length), getRandom(matrix.length)]
    if (matrix[x][y] == 0) return [x, y]
    return getRandomFreeCell(matrix)
}

//set random value in all matrix 
function setRandomFreeCellByValue(value, valueCount, matrix) {
    for (let i = 0; i < valueCount; i++) {
        const [x, y] = getRandomFreeCell(matrix)
        matrix[x][y] = value
    }
}

//gentereted matrix
function genMatrix(matrixSize) {
    const matrix = [];
    for (let y = 0; y < matrixSize; y++) {
        matrix[y] = [];
        for (let x = 0; x < matrixSize; x++) {
            matrix[y][x] = 0;
        }
    }

    setRandomFreeCellByValue(WOLF_VALUE, WOLF_COUNT, matrix);
    setRandomFreeCellByValue(RABBIT_VALUE, RABBIT_COUNT, matrix);
    setRandomFreeCellByValue(WALL_VALUE, WALL_COUNT, matrix);
    setRandomFreeCellByValue(HOME_VALUE, HOME_COUNT, matrix);
    return matrix;
}


