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

// 1. Make the deck: combine two copies of the fruits and shuffle them
const deck = shuffle([...fruits, ...fruits]);

// Get the board container from the HTML
const board = document.querySelector('#board');

// 2, 3, 4, 5. Loop through the deck to create and configure each card button
deck.forEach((fruit, i) => {
  const cardButton = document.createElement('button');
  cardButton.type = 'button';
  cardButton.classList.add('card');
  
  // Set accessibility label
  cardButton.setAttribute('aria-label', `Card ${i + 1}, face down`);
  
  // Store the position in the deck
  cardButton.dataset.index = i;
  
  // Add the card to the board
  board.appendChild(cardButton);
});
