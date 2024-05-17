import { useState, useStack } from 'react'
import { shuffleDeck } from '../utils/deckFetch.js'

export default function Sandbox(){
  const [ deck, setDeck ] = useState([]);
  const [ deckDraw, setDeckDraw] = useState([])

  function handleShuffleDeck() {
    shuffleDeck()
  }

  return (
    <>
      Sandbox
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      
    </>
  )
}