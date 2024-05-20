import './Sandbox.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  shuffleDeck, fetchDeckInfo, fetchCardsFromDeck, fetchCreatePile, fetchPileInfo } from '../utils/deckFetch2.js'

import { getDeckInfo, getDrawnCards } from '../utils/cardFunctions.js'

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

  // local piles---
  const [ pPlatoon, setPPlatoon ] = useState([])
  const [ pReserve, setPReserve ] = useState([])
  const [ pBattle, setPBattle ] = useState([])
  const [ pWar, setPWar ] = useState([])
  
  const [ ePlatoon, setEPlatoon ] = useState([])
  const [ eReserve, setEReserve ] = useState([])
  const [ eBattle, setEBattle ] = useState([])
  const [ eWar, setEWar ] = useState([])
  // --- local piles

  // game mechanics---
  const [ pExperience, setPExperience ] = useState(0)
  const [ pLevelExperience, setPLevelExperience ] = useState(0)
  const [ pLevelExperienceTarget, setPLevelExperienceTarget ] = useState(0)


  // ---game mechanics
  
  // end config ---
  
  
  // ---deck

  useEffect(() => {
    getDeckInfo()
      .then(deckInfo => setDeckInfo(deckInfo))
  }, [])

  function handleShuffleDeck() {
    setCardsDrawnFromDeck({})
    shuffleDeck()
    reset()
    setPPlatoon([])
    setEPlatoon([])
  }
  
  const watchNumCardsToDraw = watch("numCardsToDraw")
  async function handleDrawCardsFromDeck(input) {
    const num = input.numCardsToDraw
    const drawnCards = await getDrawnCards(num)
    setCardsDrawnFromDeck(drawnCards)
    setAreCardsDrawnFromDeckFaceUp(false)
  }
  
  function handleSetCardsFaceUp() {
    setAreCardsDrawnFromDeckFaceUp(true)
    setFaceUpTrigger(!faceUpTrigger)
  }

  // ---deck

  // piles---

  async function handleGetPileInfo(e) {
    const pileName = e.target.parentNode.id
    const pileInfo = await fetchPileInfo(pileName)
    console.log(`handle get pile info`, pileInfo)
  }

  async function handleDealCards() {
    // draw 26 cards
    const pPlatoonDraw = await fetchCardsFromDeck(26)
    const pPlatoonCards = pPlatoonDraw.cards
    // set pPlatoon
    setPPlatoon(pPlatoonCards)
    // get list of card codes
    const pPlatoonCardCodes = pPlatoonDraw.cards.map(({code}) => code)
    console.log(pPlatoonCardCodes)
    // create remote pile of 26 cards
    const pPlatoonResult = await fetchCreatePile("pPlatoonPile", pPlatoonCardCodes.join(","))


    // draw 26 cards
    const ePlatoonDraw = await fetchCardsFromDeck(26)
    const ePlatoonCards = ePlatoonDraw.cards
    // set ePlatoon
    setEPlatoon(ePlatoonCards)
    // get list of cards
    const ePlatoonCardCodes = ePlatoonDraw.cards.map(({code}) => code)
    console.log(ePlatoonCardCodes)

    // create remote pile
    const ePlatoonResult = await fetchCreatePile("ePlatoonPile", ePlatoonCardCodes.join(","))
  }

  // ---piles

  return (
    <>
      <h2>Sandbox</h2>
      <Play
        p1Platoon={pPlatoon}
        p2Platoon={ePlatoon}
      />
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      
      <form className="card-draw-form" onSubmit={handleSubmit(handleDrawCardsFromDeck)}>
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
          player="p"
          pile={pPlatoon}
          handleGetPileInfo={handleGetPileInfo}
        />

        <Pile
          player="e"
          pile={ePlatoon}
          handleGetPileInfo={handleGetPileInfo}
        />
      </div>
      
      <button onClick={handleDealCards}>Deal Cards</button>
    </>
  )
}


