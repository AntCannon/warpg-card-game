import './Sandbox.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  drawFromDeck,
  createPile, getPileCards, getPileInfo } from '../utils/deckFetch.js'
import {
  shuffleDeck, fetchDeckInfo, fetchCardsFromDeck } from '../utils/deckFetch2.js'
import Play from './Play.jsx'
import CardsDrawnFromDeck from './CardsDrawnFromDeck.jsx'
import Pile from './Pile.jsx'
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

  // Piles---
  const [ p1Platoon, setP1Platoon ] = useState([])
  const [ p2Platoon, setP2Platoon ] = useState([])

  // ---Piles
  
  // end config ---
  
  
  // ---deck

  useEffect(() => {
    async function getDeckInfo() {
      const actualDeckInfo = await fetchDeckInfo()
      setDeckInfo(actualDeckInfo)
    }
    getDeckInfo()

  }, [])

  function handleShuffleDeck() {
    setCardsDrawnFromDeck({})
    shuffleDeck()
    reset()
    setP1Platoon([])
    setP2Platoon([])
  }
  
  const watchNumCardsToDraw = watch("numCardsToDraw")
  async function getDrawnCards(input) {
    const num = input.numCardsToDraw
    const drawnCards = await fetchCardsFromDeck(num)
    setCardsDrawnFromDeck(drawnCards)
    setAreCardsDrawnFromDeckFaceUp(false)
  }
  
  function handleSetCardsFaceUp() {
    setAreCardsDrawnFromDeckFaceUp(true)
    setFaceUpTrigger(!faceUpTrigger)
  }

  // ---deck

  // piles---

  function handleGetPileInfo(e) {
    const pileName = e.target.parentNode.id
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
     
        createPile("p1PlatoonPile", p1CardCodes)
          .then(() => getP1PlatoonCards("p1PlatoonPile"))
        
        setTimeout(() => {
          createPile("p2PlatoonPile", p2CardCodes)
          .then(() => getP2PlatoonCards("p2PlatoonPile"))
        }, 500)
        
      })
      .catch(err => console.error(err))
  }

  // get platoon cards---
  function getP1PlatoonCards(pileName) {
    getPileCards(pileName)
      .then(data => {
        setP1Platoon(data.piles.p1PlatoonPile?.cards)
      })
      .catch(err => console.error(err))
  }

  function getP2PlatoonCards(pileName) {
    getPileCards(pileName)
      .then(data => {
        setP2Platoon(data.piles.p2PlatoonPile?.cards)
      })
      .catch(err => console.error(err))
  }
  // ---get platoon cards

  // ---piles

  return (
    <>
      <h2>Sandbox</h2>
      <Play
        p1Platoon={p1Platoon}
        p2Platoon={p2Platoon}
      />
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      
      <form className="card-draw-form" onSubmit={handleSubmit(getDrawnCards)}>
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
        <Pile
          player="p1"
          pile={p1Platoon}
          handleGetPileInfo={handleGetPileInfo}
        />

        <Pile
          player="p2"
          pile={p2Platoon}
          handleGetPileInfo={handleGetPileInfo}
        />
      </div>
      
      <button onClick={handleDealCards}>Deal Cards</button>
    </>
  )
}


