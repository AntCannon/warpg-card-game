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

// shuffle deck
// success message
export function shuffleDeck() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
    .then(response => response.json())
    .then(res => console.log(`deck shuffled`, res))
    .catch(err => console.error(err))
}

/*
// Draw from deck ------------
export function drawFromDeck(n=1) {
  const pulledCards = fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${n}`)
    .then(response => response.json())
    .then(deck => {
      console.log("cards",deck.cards)
      return deck.cards
    })
    .catch(err => console.error(err))
    
    return pulledCards
}

const pulledCards = pullNCards(52)
console.log("pulledCards",pulledCards)
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