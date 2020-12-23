const loadImages = () => {
    ImgUrls = {
        [RABBIT_VALUE]: loadImage("https://imgix.ranker.com/user_node_img/33/641410/original/bugs-bunny-people-in-tv-photo-u6?fit=crop&fm=pjpg&q=60&w=144&h=144&dpr=2"),
        [WOLF_VALUE]: loadImage("https://images-na.ssl-images-amazon.com/images/I/71625MTzN5L._AC_SY355_.jpg"),
        [WALL_VALUE]: loadImage("https://image.shutterstock.com/image-vector/brick-wall-vector-illustration-made-260nw-185568998.jpg"),
        [HOME_VALUE]: loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLgfQ8TSwCr4IcP9o7MFpij9AUxLCkoGnuQ&usqp=CAU"),
        [DIE_VALUE]: loadImage("https://yt3.ggpht.com/ytc/AAUvwngI5uBJavHiyQbr4swugYEkB3ZfXGGZddYS3mcL=s900-c-k-c0x00ffffff-no-rj"),
        [WIN_VALUE]: loadImage("https://image.shutterstock.com/z/stock-vector-comic-speech-bubble-with-expression-text-win-vector-bright-dynamic-cartoon-illustration-in-retro-532612783.jpg")
    }
}

//get select size from html select input
function getSelectSize() {
    return document.getElementById("matrixSize").value;
}

function putCharactersOnMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == WOLF_VALUE) {
                let wolf = new Wolf(x, y);
                wolfArr.push(wolf);
            }
            if (matrix[y][x] == RABBIT_VALUE) rabbit = new Rabbit(x, y);
        }
    }
}

//rabbit navigation event
function keyPressed() {
    const isLegalAction = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(keyCode);
    if (isLegalAction) {
        rabbit.move(keyCode);
        wolfArr.forEach(wolf => wolf.eat())
    }
    return false; // prevent default
}


function setup() {
    loadImages();
    const matrixSize = getSelectSize();
    clearMatrix()
    matrix = genMatrix(matrixSize);
    createCanvas(matrix[0].length * side, matrix.length * side);
    putCharactersOnMatrix(matrix);
}


function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            rect(x * side, y * side, side, side)
            if (matrix[y][x] === EMPTY_CELL_VALUE) {
                fill("#ffffcc")
            } else {
                image(ImgUrls[matrix[y][x]], x * side, y * side, side, side)
            }
        }
    }
}

function clearMatrix() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    wolfArr = [];
    rabbit = null;
}

