//genereted random in
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//get select size from select input
function getSelectSize() {
    return document.getElementById("matrixSize").value;
}


//gentereted matrix
function genMatrix() {
    const matrix = [];
    let rabbitCount = 0;
    let wolfCount = 0;
    let wallCount = 0;
    let homeCount = 0;
    let size = getSelectSize();
    for (let y = 0; y < size; y++) {
        matrix[y] = [];
        for (let x = 0; x < size; x++) {
            let randIndex = getRandomArbitrary(0, 4);
            if (randIndex === 1 && wolfCount < 5) {
                randIndex = 1;
                ++wolfCount;
            } else if (randIndex === 2 && rabbitCount < 1) {
                randIndex = 2;
                ++rabbitCount;
            } else if (randIndex === 3 && wallCount < 10) {
                randIndex = 3;
                ++wallCount;
            } else if (randIndex === 4 && homeCount < 1) {
                randIndex = 4;
                ++homeCount;
            } else {
                randIndex = 0;
            }
            matrix[y][x] = randIndex;
        }
    }
    return matrix;
}
