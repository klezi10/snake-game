const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const scoreDisplay = document.getElementById('score');
const grid = document.querySelector('.grid');
let squares = [];
let theSnake = [2, 1, 0];
let direction = 1;
let timeInterval = 1000;
let width = 10;
let appleIndex = 0;
let score = 0;
let speed = 0.9;
let timerId = 0;

document.addEventListener('keyup', controlSnake);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

//created grid with JS - 100 squares
function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

theSnake.forEach((index) => squares[index].classList.add('snake'));

function startGame() {
  clearInterval(timerId);
  timerId = setInterval(move, timeInterval);
  startBtn.style.display = 'none';
  restartBtn.style.display = 'block';
}

function move() {
  if (
    //snake is at the left wall
    (theSnake[0] % width === 0 && direction === -1) ||
    //snake is at the right wall
    (theSnake[0] % width === 9 && direction === 1) ||
    //snake is at the top
    (theSnake[0] - width < 0 && direction === -width) ||
    //snake is at the bottom
    (theSnake[0] + width >= 100 && direction === +width) ||
    //snake goes into itself
    squares[theSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId);

  const tail = theSnake.pop();
  squares[tail].classList.remove('snake');
  theSnake.unshift(theSnake[0] + direction);

  if (squares[theSnake[0]].classList.contains('apple')) {
    squares[appleIndex].classList.remove('apple');
    squares[tail].classList.add('snake');
    theSnake.push(tail);
    generateApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    timeInterval = timeInterval * speed;
    timerId = setInterval(move, timeInterval);
  }
  squares[theSnake[0]].classList.add('snake');
}

function controlSnake(event) {
  switch (event.key) {
    case 'ArrowDown':
      direction = +width;
      break;
    case 'ArrowUp':
      direction = -width;
      break;
    case 'ArrowLeft':
      direction = -1;
      break;
    default:
      direction = 1;
      return;
  }
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));

  squares[appleIndex].classList.add('apple');
}

generateApple();

function restartGame() {
  theSnake.forEach((index) => squares[index].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);
  theSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = 0;
  direction = 1;
  timeInterval = 1000;
  generateApple();
  theSnake.forEach((index) => squares[index].classList.add('snake'));
  timerId = setInterval(move, timeInterval);
}
