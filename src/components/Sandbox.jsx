import './Sandbox.css'
import { useState, useStack } from 'react'
import { shuffleDeck } from '../utils/deckFetch.js'

export default function Sandbox(){
  const [ deck, setDeck ] = useState([]);
  const [ deckDraw, setDeckDraw] = useState([])

  function handleShuffleDeck() {
    shuffleDeck()
  }

  function handleDrawFromDeck() {

  }

  return (
    <>
      Sandbox
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      <button onClick={handleDrawFromDeck}>Draw a Card from Deck</button>
      
    </>
  )
}