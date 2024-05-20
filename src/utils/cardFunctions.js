import { fetchDeckInfo, fetchCardsFromDeck } from './deckFetch2.js'

// cardFunctions.js

// get deck info---
export async function getDeckInfo() {
  const actualDeckInfo = await fetchDeckInfo()
  return actualDeckInfo
}

// ---get deck info

// get drawn cards---
export async function getDrawnCards(num) {
  const drawnCards = await fetchCardsFromDeck(num)
  return drawnCards
}
// ---get drawn cards

// add cards to local pile---
export function addCardsToLocalPile(localPile, cards) {
}

// ---add cards to local pile