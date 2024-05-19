// fetch2.js
const BURL = "https://deckofcardsapi.com/api/deck"

const deckID = "e83u76fodhaz"

//get new deck
export async function createShuffledDeck() {

  const response = await fetch(`${BURL}/new/shuffle`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const result = await response.json()
  return result
}

//get new deck
export async function shuffleDeck() {

  const response = await fetch(`${BURL}/${deckID}/shuffle`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const result = await response.json()
  console.log(result.success)
  return result
}