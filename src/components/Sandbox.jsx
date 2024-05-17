import './Sandbox.css'
import { useState, useStack } from 'react'
import { shuffleDeck, drawFromDeck } from '../utils/deckFetch.js'

export default function Sandbox(){
  const [ deck, setDeck ] = useState([]);
  const [ cardsDrawnFromDeck, setCardsDrawnFromDeck] = useState([])

  function handleShuffleDeck() {
    shuffleDeck()
  }

  function handleDrawFromDeck() {
    drawFromDeck()
      .then(deck => {
        console.log(deck.cards)
        setCardsDrawnFromDeck(deck.cards)
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      Sandbox
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      <div className="card-draw-form">
        
        <button onClick={handleDrawFromDeck}>Draw a Card from Deck</button>
      </div>
      <div>
        Card(s) Draw From Deck: 
        <div className="cards">
          {cardsDrawnFromDeck.map(({code, image}) => (
            <img className="card" src={image} key={code} />
          ))}
        </div>
      </div>
  
      
    </>
  )
}