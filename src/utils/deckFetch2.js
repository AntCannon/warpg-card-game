// fetch2.js
const BURL = "https://deckofcardsapi.com/api/deck"

const deckID = "e83u76fodhaz"

// get new deck---
export async function createShuffledDeck() {

  const response = await fetch(`${BURL}/new/shuffle`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }

  const result = await response.json()
  return result
}
// ---get new deck

// get shuffle deck---
export async function shuffleDeck() {

  const response = await fetch(`${BURL}/${deckID}/shuffle`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }

  const result = await response.json()
  console.log(`shuffle deck` , result.success)
  return result
}
// ---get shuffled deck

// get deck info---
export async function fetchDeckInfo() {

  const response = await fetch(`${BURL}/${deckID}`)
  
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }

  const deckInfo = response.json()
  return deckInfo
}

// ---get deck info

// fetch card from deck---
export async function fetchCardsFromDeck(n = 1) {

  const response = await fetch(`${BURL}/${deckID}/draw/?count=${n}`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }

  const drawnCards =  response.json()
  console.log(`drawn Cards async`, drawnCards)
  return drawnCards
}


// ---fetch card from deck