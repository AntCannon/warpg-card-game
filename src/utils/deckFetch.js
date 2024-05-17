// Manage Deck --------------

// get new deck
// success message
export function createShuffledDeck() {
  return fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
    .then(response => response.json())
    .then(res => console.log(`deck created`, res))
    .catch(err => console.error(err))
}

// createShuffled()
const deckID = "e83u76fodhaz"

//get deck info
export function getDeckInfo() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}`)
    .then(response => response.json())
}


// shuffle deck
// success message
export function shuffleDeck() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
    .then(response => response.json())
    .then(res => console.log(`deck shuffled`, res))
    .catch(err => console.error(err))
}

// Draw from deck ------------
// data => resp {}
// data.cards => cards[]
export function drawFromDeck(n=1) {
  return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${n}`)
    .then(response => response.json())
}

// const deckLocal =

/*
function getCardsInPile(pile) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${pile}/list/`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

// getCardsInPile()


*/