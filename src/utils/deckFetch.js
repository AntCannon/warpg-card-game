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
  return fetch(`https://deckofcardsapi.com/api/deck/${deckID}`)
    .then(response => response.json())
}

// shuffle deck
// success message
export function shuffleDeck() {
  return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
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


// create player1 pile
/*
{
  "success": true,
  "deck_id": "3p40paa87x90",
  "remaining": 12,
  "piles": {
      "CREATED PILE": {
          "remaining": 2
      }
  }
}
*/

export function createPile(pile, cardCodes) {

  return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${pile}/add/?cards=${cardCodes}`)
    .then(response => response.json())
    .then(pile => console.log(pile))
    .catch(err => console.error(err))
}

// get pile info
export function getPileInfo(pileName) {

  return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${pileName}/list`)
    .then(response => response.json())
    .then(pile => console.log(pile))
    .catch(err => console.error(err))
}
// get pile cards
export function getPileCards(pileName) {

  console.log(deckID, pileName)
  
  return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${pileName}/list`)
    .then(response => response.json())

  // return fetch(`https://deckofcardsapi.com/api/deck/e83u76fodhaz/pile/p1PlatoonPile/list/`)
  // .then(response => response.json())
    
}