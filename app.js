const fruits = [
  { name: "apple", symbol: "🍎" },
  { name: "banana", symbol: "🍌" },
  { name: "cherry", symbol: "🍒" },
  { name: "coconut", symbol: "🥥" },
  { name: "grapes", symbol: "🍇" },
  { name: "mango", symbol: "🥭" },
  { name: "pineapple", symbol: "🍍" },
  { name: "watermelon", symbol: "🍉" }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let deck = [];
let turnedCards = [];
let moves = 0;
let waiting = false;
let timeoutId = null;

const board = document.querySelector('#board');
const movesDisplay = document.querySelector('#moves');
const statusDisplay = document.querySelector('#status');
const newGameButton = document.querySelector('#new-game');

// Exercise 1: Build the shuffled board
function createBoard() {
  deck = shuffle([...fruits, ...fruits]);
  board.replaceChildren();

  deck.forEach((fruit, i) => {
    const cardButton = document.createElement('button');
    cardButton.type = 'button';
    cardButton.classList.add('card');
    cardButton.setAttribute('aria-label', `Card ${i + 1}, face down`);
    cardButton.dataset.index = i;
    board.appendChild(cardButton);
  });
}

// Exercise 2, 3, 4: Handle card clicks and game logic
board.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  
  if (!card) return;
  if (waiting) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  // Turn card over
  const index = card.dataset.index;
  const fruit = deck[index];

  card.textContent = fruit.symbol;
  card.classList.add('flipped');
  card.setAttribute('aria-label', `Card ${Number(index) + 1}, ${fruit.name}`);

  turnedCards.push({ card, fruit });

  if (turnedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    const [card1, card2] = turnedCards;

    if (card1.fruit.name === card2.fruit.name) {
      // Exercise 3: Matching pair
      card1.card.classList.add('matched');
      card2.card.classList.add('matched');
      card1.card.disabled = true;
      card2.card.disabled = true;
      statusDisplay.textContent = "That's a pair!";
      turnedCards = [];

      // Exercise 5: Check if all pairs are found
      const matchedCards = document.querySelectorAll('.card.matched');
      if (matchedCards.length === deck.length) {
        statusDisplay.textContent = `You found all the pairs in ${moves} moves!`;
        statusDisplay.classList.add('you-won');
      }
    } else {
      // Exercise 4: Not a pair, turn back after delay
      statusDisplay.textContent = "Not a pair. Try again.";
      waiting = true;

      timeoutId = setTimeout(() => {
        card1.card.textContent = "";
        card1.card.classList.remove('flipped');
        card1.card.setAttribute('aria-label', `Card ${Number(card1.card.dataset.index) + 1}, face down`);

        card2.card.textContent = "";
        card2.card.classList.remove('flipped');
        card2.card.setAttribute('aria-label', `Card ${Number(card2.card.dataset.index) + 1}, face down`);

        turnedCards = [];
        waiting = false;
      }, 1000);
    }
  }
});

// Exercise 6: Start a new game
newGameButton.addEventListener('click', () => {
  if (waiting) {
    clearTimeout(timeoutId);
    waiting = false;
  }

  turnedCards = [];
  moves = 0;
  movesDisplay.textContent = moves;
  statusDisplay.textContent = "Turn over two cards to find a matching pair.";
  statusDisplay.classList.remove('you-won');

  createBoard();
});

// Initial game setup when page loads
createBoard();
