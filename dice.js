// Select HTML elements we'll use
const diceEl = document.getElementById('dice');           // shows dice face
const rollBtn = document.getElementById('roll-button');   // Roll button
const historyEl = document.getElementById('roll-history'); // list for past rolls

let rollHistory = []; // array to store previous roll numbers

// Function to return a Unicode dice face for numbers 1–6
function getDiceFace(num) {
  const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  return faces[num - 1];
}

// Function to perform roll action
function rollDice() {
  diceEl.style.transform = 'rotate(0deg)'; // reset spin

  const num = Math.floor(Math.random() * 6) + 1; // random between 1–6
  diceEl.textContent = getDiceFace(num); // update dice face

  // Save roll and update history display
  rollHistory.push(num);
  updateHistory();

  // Add a quick spin animation on each roll
  setTimeout(() => {
    diceEl.style.transform = 'rotate(360deg)';
  }, 50);
}

// Function to update the history list items
function updateHistory() {
  historyEl.innerHTML = ''; // clear previous items
  rollHistory.forEach((val, i) => {
    const li = document.createElement('li');
    li.textContent = `Roll ${i + 1}: ${val}`;
    historyEl.appendChild(li);
  });
}

// Attach click listener to the roll button
rollBtn.addEventListener('click', rollDice);

// Initialize with one roll to show starting face
rollDice();
