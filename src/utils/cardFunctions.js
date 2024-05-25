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

// getCardsFrom---
export function getCardsFromPile(num = 1, pile) {
  const removedCards = pile.splice(-num)
  const removedCardCodes = removedCards.map(({code}) => code)
  return [removedCards, removedCardCodes]
}
// ---getCardsFrom

// add isFaceUp---
export function addIsFaceUp(arr) {
  console.log(`addIsFaceUp`, arr)
  return arr.map(card => card.isFaceUp = true)
}
// ---add isFaceUp

// add turn cards face up---
export function turnCardsFaceUp(arr, num = 0) {
  console.log(`pre flip`, arr) 
  if (!num) num = arr.length
  for (let i = arr.length - num; i < arr.length; i++) {
    arr[i].isFaceUp = true
  }
 console.log(`post flip`, arr) 
}
// ---add turn cards face up