const WOLF_VALUE = 1;
const RABBIT_VALUE = 2;
const WALL_VALUE = 3;
const HOME_VALUE = 4;
const EMPTY_CELL_VALUE = 0;
const X = 0;
const Y = 1;
let side = 50;
let rabbit;
let matrix = [];
let wolfArr = [];


function setup() {
    cleanMatrix()
    matrix = genMatrix()
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == WOLF_VALUE) {
                let wolf = new Wolf(x, y, WOLF_VALUE);
                wolfArr.push(wolf)
            }
            if (matrix[y][x] == RABBIT_VALUE) {
                rabbit = new Rabbit(x, y, RABBIT_VALUE);
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
            wolfArr[i].eat();
        }
    }
    return false; // prevent default
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == WOLF_VALUE) fill("red");
            else if (matrix[y][x] == RABBIT_VALUE) fill("blue");
            else if (matrix[y][x] == WALL_VALUE) fill("black");
            else if (matrix[y][x] == HOME_VALUE) fill("orange");
            else if (matrix[y][x] == EMPTY_CELL_VALUE) fill("white");
            rect(x * side, y * side, side, side);
        }
    }
}

function cleanMatrix() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    wolfArr.length = 0;
    rabbit = null;
}

