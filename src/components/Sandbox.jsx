import './Sandbox.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  shuffleDeck, fetchDeckInfo, fetchCardsFromDeck, fetchCreatePile, fetchPileInfo } from '../utils/deckFetch2.js'

import { getDeckInfo, getDrawnCards, getCardsFromPile, addIsFaceUp, turnCardsFaceUp } from '../utils/cardFunctions.js'

import Play from './Play.jsx'
// import CardsDrawnFromDeck from './CardsDrawnFromDeck.jsx'
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
  // ---piles

  async function handleDealCards() {
    const pPlatoonDraw = await fetchCardsFromDeck(26)
    const pPlatoonCards = pPlatoonDraw.cards
    setPPlatoon(pPlatoonCards)
    const pPlatoonCardCodes = pPlatoonDraw.cards.map(({code}) => code)
    const pPlatoonResult = await fetchCreatePile("pPlatoonPile", pPlatoonCardCodes.join(","))

    const ePlatoonDraw = await fetchCardsFromDeck(26)
    const ePlatoonCards = ePlatoonDraw.cards
    setEPlatoon(ePlatoonCards)
    const ePlatoonCardCodes = ePlatoonDraw.cards.map(({code}) => code)
    const ePlatoonResult = await fetchCreatePile("ePlatoonPile", ePlatoonCardCodes.join(","))
  }

  // battle---
  function handlePrepPhase() {
    prepPhase()
    battlePhase()
  }

  function prepPhase() {
    // player
      // take card from P
      const [ pBattleCards, pBattleCodes ] = getCardsFromPile(1, pPlatoon)
      // remove card from PPile
      // put card on B
      setPBattle(addIsFaceUp(pBattleCards))
      // add card to BPile

    // enemy
      // take card from P
      const [ eBattleCards, eBattleCodes ] = getCardsFromPile(1, ePlatoon)
      // remove card from PPile
      // put card on B
      setEBattle(addIsFaceUp(eBattleCards))
      // add card to BPile

    // later feature
    // pick a power up
    console.log(`prepPhase cards`, pBattleCards, eBattleCards)
  }

  function battlePhase() {
    // player battle card flip
    console.log(pBattle)
    // enemy battle card flip
    console.log(eBattle)
    // compare cards
      // pB > eB
        // remove cards from eB
        // remove card from eBPile

        // add cards to pR
        // add cards to cardList

        // remove cards from pB
        // remove cards from pBPile

        // add cards to PR
        // add cards to cardList

        // add cardList to pRPile
        
      // pB < eB
      // pB = eB

  }
  // ---battle

  return (
    <>
      <h2>Sandbox</h2>
      <Play
        pPlatoon={pPlatoon}
        ePlatoon={ePlatoon}
        pBattle={pBattle}
        eBattle={eBattle}
        handlePrepPhase={handlePrepPhase}
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


