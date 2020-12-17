const WOLF_INDEX = 1;
const RABBIT_INDEX = 2;
const WALL_INDEX = 3;
const HOME_INDEX = 4;
const EMPTY_CELL_INDEX = 0;
const X = 0;
const Y = 1;
let matrix = [];
let side = 50;
let wolfArr = [];
let rabbit;


function setup() {
    matrix = genMatrix()
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == WOLF_INDEX) {
                let wolf = new Wolf(x, y, WOLF_INDEX);
                wolfArr.push(wolf)
            }
            if (matrix[y][x] == RABBIT_INDEX) {
                rabbit = new Rabbit(x, y, RABBIT_INDEX);
            }
        }
    }
}

//rabbit navigation event
function keyPressed() {
    if (keyCode === UP_ARROW) rabbit.move("Up");
    else if (keyCode === DOWN_ARROW) rabbit.move("Down");
    else if (keyCode === LEFT_ARROW) rabbit.move("Left");
    else if (keyCode === RIGHT_ARROW) rabbit.move("Right");
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        for (let i in wolfArr) {
            wolfArr[i].move();
        }
    }
    return false; // prevent default
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == WOLF_INDEX) fill("red");
            else if (matrix[y][x] == RABBIT_INDEX) fill("blue");
            else if (matrix[y][x] == WALL_INDEX) fill("black");
            else if (matrix[y][x] == HOME_INDEX) fill("orange");
            else if (matrix[y][x] == HOME_INDEX) fill("orange");
            else if (matrix[y][x] == EMPTY_CELL_INDEX) fill("white");
            rect(x * side, y * side, side, side);
        }
    }
}

