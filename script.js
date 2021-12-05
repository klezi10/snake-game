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
  squares[theSnake[0]].classList.add('snake');

  if (squares[theSnake[0]].classList.contains('apple')) {
    squares[appleIndex].classList.remove('apple');

    //add a square to the snake
    theSnake.push(tail);
    generateApple();
  }
}

move();

let timerId = setInterval(move, timeInterval);

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

document.addEventListener('keyup', controlSnake);

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));

  squares[appleIndex].classList.add('apple');
}

generateApple();
