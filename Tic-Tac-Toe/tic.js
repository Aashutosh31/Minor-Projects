// script.js
const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer = "X";
let moves = Array(9).fill(null);
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

status.textContent = "Player X's turn";

function handleClick(e) {
  const idx = +e.target.dataset.index;
  if (!gameActive || moves[idx]) return;
  moves[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = currentPlayer === "X" ? "#618fff" : "#f17ea2";
  checkResult();
}

function checkResult() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      gameActive = false;
      status.innerHTML = `<span style='color:#12ce83; font-weight:600;'>Player ${moves[a]} wins!</span>`;
      highlightCells(pattern);
      return;
    }
  }
  if (!moves.includes(null)) {
    gameActive = false;
    status.innerHTML = "<span style='color:#e77a5d; font-weight:600;'>It's a Draw!</span>";
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightCells(pattern) {
  pattern.forEach(i => cells[i].style.background = "#fdd835");
}

function restartGame() {
  moves.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.background = "#e3e6f3";
    cell.style.color = "#1e293b";
  });
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
