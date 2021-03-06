//width of the grid
const width = 10;
let nextRandom = 0
//selecting div with class grid
const grid = document.querySelector(".grid");
const squares = document.querySelectorAll(".grid div");
const ScoreDisplay = document.querySelector("#score");
const StartBtn = document.querySelector("#start-button");

//the Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

//random select a tetromino and it's first rotation
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][0];

//draw tetrimino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

//undraw the tetrimino

function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

// make blocks move down
timerId = setInterval(moveDown, 1000);

//assign functions keyCodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode == 38) {
    rotate();
  } else if (e.keyCode == 39) {
    moveRight();
  } else if (e.keyCode == 40) {
    moveDown();
  }
}
document.addEventListener("keyup", control);

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

//freeze function
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    //start a new block falling
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape()
  }
}

//move the block to left

function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );

  if (!isAtLeftEdge) currentPosition -= 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
}

//move the tetromino right, unless is at the edge or there is a blockage
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

//rotate block

function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    //if cureent rotation gets 4 , make it go back to 0
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

//show upe next blocks mini grid

const displaySquares = document.querySelectorAll(".mini-grid div");
const displayWidth = 4;
let displayIndex = 0;


//the blocks without rotations

const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
  [0, 1, displayWidth, displayWidth + 1], //oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
];

//display the shape on the grid mini-grid display

function displayShape(){
  displaySquares.forEach(square => {
    squares.classList.remove('tetromino')

  })
  upNextTetrominoes[nextRandom].forEach(index =>{
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}
