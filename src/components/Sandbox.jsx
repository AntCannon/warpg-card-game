import './Sandbox.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  shuffleDeck, drawFromDeck, getDeckInfo,
  createPile, getPileInfo } from '../utils/deckFetch.js'
import CardsDrawnFromDeck from './cardsDrawnFromDeck.jsx'
import Card from './Card.jsx'

export default function Sandbox(){
  // config ---
  const [ deckInfo, setDeckInfo ] = useState({})
  const [ cardsDrawnFromDeck, setCardsDrawnFromDeck] = useState({})
  const [ areCardsDrawnFromDeckFaceUp, setAreCardsDrawnFromDeckFaceUp ] = useState(false)
  const [ faceUpTrigger, setFaceUpTrigger ] = useState(false)

  // card draw form---
  const cardDrawForm = useForm({
    defaultValues: {
      numCardsToDraw: 1,
    }
  })

  const {
    register,
    watch,
    handleSubmit,
    reset,
  } = cardDrawForm;
  // ---card draw form

  // Pile---
  const [ player1Pile, setPlayer1Pile ] = useState([])

  // ---Pile
  
  // end config ---
  const watchNumCardsToDraw = watch("numCardsToDraw")
  function handleShuffleDeck() {
    setCardsDrawnFromDeck({})
    shuffleDeck()
    reset()
  }
  
  // ---deck
  function drawCards(input) {
    const num = input.numCardsToDraw
  
    drawFromDeck(num)
    .then(deck => {
      setCardsDrawnFromDeck(deck)
    })
    .catch(err => console.error(err))
  
    setAreCardsDrawnFromDeckFaceUp(false)
  }
  
  function handleSetCardsFaceUp() {
    setAreCardsDrawnFromDeckFaceUp(true)
    setFaceUpTrigger(!faceUpTrigger)
  }

  useEffect(() => {
    getDeckInfo()
     .then(deckData => setDeckInfo(deckData))
     .catch(err => console.error(err))
  })

  // ---deck

  // piles---

  function handleGetPileInfo(e) {
    const pileName = e.target.parentNode.id
    console.log(`pileName`,pileName)
    getPileInfo(pileName)
  }

  function handleDealCards() {
    drawFromDeck(52)
    .then(deck => {
      let p1CardCodes = []
      let p2CardCodes = []
      deck.cards
        .forEach(({code}, idx) => 
          (idx % 2 ? p1CardCodes : p2CardCodes)
        .push(code))

      p1CardCodes = p1CardCodes.join(",")
      p2CardCodes = p2CardCodes.join(",")
        
      console.log('p1CardCodes', p1CardCodes)
      console.log('p2CardCodes', p2CardCodes)

      createPile("p1PlatoonPile", p1CardCodes)
      createPile("p2PlatoonPile", p2CardCodes)
      setPlayer1Pile(deck)
    })
    .catch(err => console.error(err))
  }

  // ---piles

  return (
    <>
      <h2>Sandbox</h2>
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      <form className="card-draw-form" onSubmit={handleSubmit(drawCards)}>
        <label><h3 style={{ display: "inline-block" }}>Number of Cards to Draw:</h3>
          <input
            className="input-deck-draw-count"
            type="number"
            id="numCardsToDraw"
            {...register("numCardsToDraw")}
          />
        </label>
        <button type="submit">Draw {watchNumCardsToDraw} Card{watchNumCardsToDraw > 1 ? "(s)" : ""} from Deck</button>
      </form>
      <div>
          <CardsDrawnFromDeck
            cardsDrawnFromDeck={cardsDrawnFromDeck}
            areCardsDrawnFromDeckFaceUp={areCardsDrawnFromDeckFaceUp}
            faceUpTrigger={faceUpTrigger}
             />
          <button
            onClick={handleSetCardsFaceUp}>Flip Cards Up</button>
        <h3>Cards Remaining in Deck: {cardsDrawnFromDeck?.remaining || deckInfo.remaining}</h3>
      </div>
      <div className="piles">
        <div className="p1 platoon cards" id="p1PlatoonPile">
          <div className="p1-platoon soldiers">

          </div>
          <button onClick={handleGetPileInfo}>Get Platoon Info</button>
        </div>
        <div className="p2 platoon cards" id="p2PlatoonPile">
          <div className="p1-platoon soldiers">

          </div>
          <button onClick={handleGetPileInfo}>Get Platoon Info</button>
        </div>
      </div>
      <button onClick={handleDealCards}>Deal Cards</button>
    </>
  )
}


