// script.js (Very Simple Version)

const board = document.getElementById("board");
const status = document.getElementById("status");

let player = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameRunning = true;

function setupBoard() {
  board.innerHTML = "";
  status.innerText = "Player " + player + "'s turn";
  gameRunning = true;
  cells = ["", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    cell.addEventListener("click", play);
    cell.innerText = "";
    board.appendChild(cell);
  }
}

function play() {
  let index = this.id;

  if (cells[index] !== "" || !gameRunning) {
    return; // Cell already taken or game over
  }

  cells[index] = player;
  this.innerText = player;

  if (checkWin()) {
    status.innerText = "Player " + player + " wins!";
    gameRunning = false;
    return;
  }

  if (cells.indexOf("") === -1) {
    status.innerText = "It's a draw!";
    gameRunning = false;
    return;
  }

  player = player === "X" ? "O" : "X";
  status.innerText = "Player " + player + "'s turn";
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // columns
    [0,4,8], [2,4,6]            // diagonals
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (cells[a] !== "" && cells[a] === cells[b] && cells[b] === cells[c]) {
      return true;
    }
  }

  return false;
}

function restart() {
  setupBoard();
}

// Initialize the game board when the page loads
setupBoard();
