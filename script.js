const startBtn = document.querySelector('#start');
const scoreDisplay = document.getElementById('score');
const grid = document.querySelector('.grid');
let squares = [];
theSnake = [2, 1, 0];

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

// function move() {

// }

// move()
