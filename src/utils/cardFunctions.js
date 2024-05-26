import { shuffleDeck, fetchCardsFromDeck } from './deckFetch2.js'

// shuffle deck---

// ---shuffle deck

// deal cards---
export async function dealCards() {
  const fetchedCards = await fetchCardsFromDeck(52)
  addIsFaceUpProp(fetchedCards.cards)
  const drawnCards = fetchedCards.cards
  const pCards = drawnCards.splice(0,26)
  const eCards = drawnCards.splice(0,26)
  return [pCards, eCards]
}
// ---deal cards

// add is face up prop---
export function addIsFaceUpProp(arr) {
  return arr.forEach(card => card.isFaceUp = false)
}
// ---add is face up prop

// turn card face up---
export function turnCardsFaceUp(arr) {
  arr.forEach(card => card.isFaceUp = true)
  console.log(arr)
}
// ---turn card face up

// transfer cards---
export function transferCards(fromPile, toPile, num = 1) {
  const fromPileCopy = [...fromPile]
  const cardsToTransfer = fromPileCopy.splice(-num)
  return [fromPileCopy, cardsToTransfer]
}
// ---transfer cards

// compare cards---

const valueMap = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 11,
  "KING": 12,
  "QUEEN": 13,
  "ACE": 14,
}

export function compareBattleCards(pBattlePile, eBattlePile) {
  const pCard = pBattlePile[pBattlePile.length-1]
  const eCard = eBattlePile[eBattlePile.length-1]
  
  const pCardValue = pCard.value
  const eCardValue = eCard.value

  const pCardValueNum = valueMap[pCardValue]
  const eCardValueNum = valueMap[eCardValue]

  let winner = null
  let loser = null
  let result = null
  let cards = null
  if (pCardValueNum > eCardValueNum) {
    winner = "p"
    loser = "e"
    result = 'Win!'
    cards = [eCard, pCard]
  } else if (pCardValueNum < eCardValueNum) {
    winner = "e"
    loser = "p"
    result = "Lose!"
    cards = [pCard, eCard]
  } else {
    result = "War!"
  }

  return { winner, loser, result, cards }
}
 // ---compare cards