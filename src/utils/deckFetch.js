const BURL = "https://deckofcardsapi.com/api/deck"
const deckID = "e83u76fodhaz"

// Manage Deck --------------

// get new deck
// success message
export function createShuffledDeck() {
  return fetch(`${BURL}/new/shuffle`)
    .then(response => response.json())
    .then(res => console.log(`deck created`, res))
    .catch(err => console.error(err))
}

// createShuffled()

//get deck info
export function getDeckInfo() {
  return fetch(`${BURL}/${deckID}`)
    .then(response => response.json())
}

// shuffle deck
// success message
export function shuffleDeck() {
  return fetch(`${BURL}/${deckID}/shuffle/`)
    .then(response => response.json())
    .then(res => console.log(`deck shuffled`, res))
    .catch(err => console.error(err))
}

// Draw from deck ------------
// data => resp {}
// data.cards => cards[]
export function drawFromDeck(n = 1) {
  return fetch(`${BURL}/${deckID}/draw/?count=${n}`)
    .then(response => response.json())
}

/* draw from deck response
{
  "success": true, 
  "deck_id": "kxozasf3edqu", 
  "cards": [
    {
      "code": "6H", 
      "image": "https://deckofcardsapi.com/static/img/6H.png", 
      "images": {
            "svg": "https://deckofcardsapi.com/static/img/6H.svg", 
            "png": "https://deckofcardsapi.com/static/img/6H.png"
        }, 
      "value": "6", 
      "suit": "HEARTS"
    }, 
    {
      "code": "5S", 
      "image": "https://deckofcardsapi.com/static/img/5S.png", 
      "images": {
          "svg": "https://deckofcardsapi.com/static/img/5S.svg", 
          "png": "https://deckofcardsapi.com/static/img/5S.png"
      }, 
      "value": "5", 
      "suit": "SPADES"
    }
  ], 
  "remaining": 50
}
*/


//--- draw from deck


// create pile---

export function createPile(pile, cardCodes) {

  return fetch(`${BURL}/${deckID}/pile/${pile}/add/?cards=${cardCodes}`)
    .then(response => response.json())
    .then(pile => console.log(`pile created`, pile))
    .catch(err => console.error(err))
}

/* Create pile response
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

// ---create pile

// get pile info---
export function getPileInfo(pileName) {

  return fetch(`${BURL}/${deckID}/pile/${pileName}/list`)
    .then(response => response.json())
    .then(pile => console.log(pile))
    .catch(err => console.error(err))
}

// ---get pile info

// get pile cards---
export function getPileCards(pileName) {

  return fetch(`${BURL}/${deckID}/pile/${pileName}/list/`)
    .then(response => response.json())

  // return fetch(`https://deckofcardsapi.com/api/deck/e83u76fodhaz/pile/p1PlatoonPile/list/`)
  // .then(response => response.json())

}

/* -- response
{
  "success": true,
  "deck_id": "d5x0uw65g416",
  "remaining": "42",
  "piles": {
    "player1": {
      "remaining": "3"
    },
      "player2": {
        "cards": [
          {
            "image": "https://deckofcardsapi.com/static/img/KH.png",
            "value": "KING",
            "suit": "HEARTS",
            "code": "KH"
          },
          {
            "image": "https://deckofcardsapi.com/static/img/8C.png",
            "value": "8",
            "suit": "CLUBS",
            "code": "8C"
          }
        ],
      "remaining": "2"
    }
  },
}
*/
// ---get pile cards