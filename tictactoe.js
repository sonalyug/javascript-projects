// Select all grid cells and convert NodeList to an Array for easy indexing
const cells = Array.from(document.querySelectorAll('.cell')); // list of 9 cells

// Get the DOM elements for displaying status and buttons
const statusText = document.getElementById('status'); // area to show current status
const turnSpan   = document.getElementById('turn');   // span showing whose turn it is
const resetBtn   = document.getElementById('reset');  // button to undo last move
const newGameBtn = document.getElementById('newGame'); // button to start fresh game

// Define player symbols (constants)
const X = 'X', O = 'O';
let currentPlayer = X;                     // tracks whose turn it is
let board = Array(9).fill('');            // internal 9-element board array, all empty initially
let moveHistory = [];                      // array storing indices of moves made
let gameActive = true;                     // flag to determine if game is ongoing

// Predefined win patterns—rows, columns, diagonals
const wins = [
  [0,1,2], [3,4,5], [6,7,8], // 3 rows
  [0,3,6], [1,4,7], [2,5,8], // 3 columns
  [0,4,8], [2,4,6]           // 2 diagonals
];

// Handler function for when a cell is clicked
function handleCellClick(e) {
  const idx = +e.target.dataset.index;      // convert dataset-index to number
  if (board[idx] !== '' || !gameActive) return; // ignore click if cell occupied or game ended

  board[idx] = currentPlayer;              // record move in board array
  e.target.classList.add(currentPlayer.toLowerCase()); // add 'x' or 'o' class for styling
  e.target.textContent = currentPlayer;    // display X or O in the cell
  moveHistory.push(idx);                   // record the move in history stack

  if (checkWin()) {                        // if current move wins the game
    statusText.textContent = `Winner: ${currentPlayer}!`; // show winner
    gameActive = false;                    // stop further moves
  } else if (board.every(v => v !== '')) { // check for draw—board full with no winner
    statusText.textContent = 'Draw!';      // display draw state
    gameActive = false;                    // stop moves
  } else {
    // switch player and update on-screen turn display
    currentPlayer = currentPlayer === X ? O : X;
    turnSpan.textContent = currentPlayer;
  }
}

// Function to check if current player has any winning combination
function checkWin() {
  return wins.some(arr =>
    arr.every(i => board[i] === currentPlayer) // each cell in the pattern must match current player
  );
}

// Undo last move (reset last placed symbol)
function resetMove() {
  if (!moveHistory.length || !gameActive) return; // nothing to undo or game over

  const last = moveHistory.pop();               // get last move index
  board[last] = '';                             // empty that cell in board array
  const cell = cells[last];                     // get the actual cell DOM element
  cell.textContent = '';                        // remove displayed symbol
  cell.classList.remove('x', 'o');              // remove styling class

  // Determine whose turn it is next: if even moves done, it's X's turn; else O's
  currentPlayer = moveHistory.length % 2 === 0 ? X : O;
  turnSpan.textContent = currentPlayer;         // update display turn
  statusText.textContent = `Turn: ${currentPlayer}`; // update status message
}

// Start new game—clear board completely
function newGame() {
  board.fill('');                             // reset internal board
  moveHistory = [];                           // clear move history

  cells.forEach(c => {                        // loop over each DOM cell
    c.textContent = '';                       // clear display
    c.classList.remove('x', 'o');             // clear classes
  });

  currentPlayer = X;                          // reset to player X
  gameActive = true;                          // allow new moves
  turnSpan.textContent = X;                   // show current player
  statusText.textContent = `Turn: ${X}`;      // initial status line
}

// Attach click listeners to cells and buttons
cells.forEach(c => c.addEventListener('click', handleCellClick)); // cell clicks
resetBtn.addEventListener('click', resetMove);                    // undo button
newGameBtn.addEventListener('click', newGame);                    // new game button

// Initialize game with starting status display
statusText.textContent = `Turn: ${currentPlayer}`; // show whose turn it is at start
