//genereted random number
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//get select size from select input
function getSelectSize() {
    return document.getElementById("matrixSize").value;
}

//set random value in all matrix 
function setRandomFreeCellByValue(value, valueCount, matrix, matrixSize) {
    for (let i = 0; i < valueCount; i++) {
        let y = Math.floor(Math.random() * matrixSize)
        let x = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) matrix[y][x] = value
    }
}
//gentereted matrix
function genMatrix() {
    const matrix = [];
    const matrixSize = getSelectSize();
    for (let y = 0; y < matrixSize; y++) {
        matrix[y] = [];
        for (let x = 0; x < matrixSize; x++) {
            matrix[y][x] = 0;
        }
    }

    setRandomFreeCellByValue(1, 5, matrix, matrixSize);
    setRandomFreeCellByValue(2, 1, matrix, matrixSize);
    setRandomFreeCellByValue(3, 5, matrix, matrixSize);
    setRandomFreeCellByValue(4, 1, matrix, matrixSize);
    return matrix;
}


