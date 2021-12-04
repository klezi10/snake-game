const startBtn = document.querySelector('#start');
const scoreDisplay = document.getElementById('score');
const grid = document.querySelector('.grid');
let squares = [];
let theSnake = [2, 1, 0];
let direction = 1;
let timeInterval = 1000;
let width = 10;

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
  const tail = theSnake.pop();
  squares[tail].classList.remove('snake');
  theSnake.unshift(theSnake[0] + direction);
  squares[theSnake[0]].classList.add('snake');
}

move();

let timerId = setInterval(move, timeInterval);

function controlSnake(event) {
  switch (event.key) {
    case 'ArrowDown':
      console.log('down press');
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
