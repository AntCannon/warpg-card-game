import './Field.css'
import { useState } from 'react'

import { shuffleDeck } from '../utils/deckFetch2.js'
import { dealCards, transferCards, turnCardsFaceUp, compareBattleCards } from '../utils/cardFunctions.js'
import { timeout } from '../utils/gameMechanics.js'


import Pile from './Pile.jsx'
const backOfCard = "https://deckofcardsapi.com/static/img/back.png"

export default function Play({
}) {
  const [ update, setUpdate ] = useState(false)
  // piles---
  const [ pPlatoon, setPPlatoon ] = useState([])
  const [ pBattle, setPBattle ] = useState([])
  const [ pReserves, setPReserves ] = useState([])
  const [ pWar, setPWar ] = useState([])
  
  const [ ePlatoon, setEPlatoon ] = useState([])
  const [ eBattle, setEBattle ] = useState([])
  const [ eReserves, setEReserves ] = useState([])
  const [ eWar, setEWar ] = useState([])
  // ---piles

  // displays---
  const [ pRounds, setPRounds] = useState(0)
  const [ eRounds, setERounds] = useState(0)
  // ---displays

  // handlers---
  async function handleShuffleDeck() {
    shuffleDeck()
  }
  
  async function handleDealCards() {
    const [ pCards, eCards ] = await dealCards()
    setPPlatoon(pCards)
    setEPlatoon(eCards)
  }

  function handlePrep() {
    prepPhase()
  }
  function handleBattle() {
    battlePhase()
    comparePhase()
  }
  // ---handlers

  // prep phase---
  function prepPhase() {
    const [ updatedPPlatoon, pPlatoonToPBattle ] = transferCards(pPlatoon, pBattle)
    setPPlatoon(updatedPPlatoon)
    setPBattle([...pBattle, ...pPlatoonToPBattle])

    const [ updatedEPlatoon, ePlatoonToEBattle ] = transferCards(ePlatoon, eBattle)
    setEPlatoon(updatedEPlatoon)
    setEBattle([...eBattle, ...ePlatoonToEBattle])
  }
  // ---prep phase

  // war prep phase---
  function warPrepPhase() {
    if (pPlatoon.length > 3) {
      const [ updatedPPlatoon, pPlatoonToPWar ] = transferCards(pPlatoon, pWar, 3)
      setPPlatoon(updatedPPlatoon)
      setPWar([...pWar, ...pPlatoonToPWar])

      const [ updatedEPlatoon, ePlatoonToEWar ] = transferCards(ePlatoon, eWar, 3)
      setEPlatoon(updatedEPlatoon)
      setEWar([...eWar, ...ePlatoonToEWar])
    } else if (pPlatoon.length === 0) {
        console.log(`No Troops for War, Retreat!`)
    } else if (pPlatoon.length === 1) {
      console.log(`1 Troop Left... It in your hands soldier!`)
    } else {
      const num = pPlatoon.length - 1

      const [ updatedPPlatoon, pPlatoonToPWar ] = transferCards(pPlatoon, pWar, num)
      setPPlatoon(updatedPPlatoon)
      setPWar([...pWar, ...pPlatoonToPWar])

      const [ updatedEPlatoon, ePlatoonToEWar ] = transferCards(ePlatoon, eWar, num)
      setEPlatoon(updatedEPlatoon)
      setEWar([...eWar, ...ePlatoonToEWar])
    }

  }
  // ---war prep phase

  // battle phase---
  function battlePhase() {
    turnCardsFaceUp(pBattle)
    turnCardsFaceUp(eBattle)
    setUpdate(!update)
  }
  // ---battle phase

  // compare phase---
  function comparePhase() {
    const { result, cards } = compareBattleCards(pBattle, eBattle)
    console.log(`compare phase`, result, cards)

    const delay = 1000
    if (result === "Win!") {
      setTimeout(()=>{
        const updatedCards = [...pReserves, ...eWar, ...pWar, ...eBattle, ...pBattle]
        setPReserves(updatedCards)
        setPBattle([])
        setEBattle([])
        setPWar([])
        setEWar([])
        setPRounds(updatedCards.length/2)
      }, delay)

    } else if (result === "Lose!") {
      setTimeout(()=>{
        const updatedCards = [...eReserves, ...pWar, ...eWar, ...pBattle, ...eBattle]
        setEReserves(updatedCards)
        setPBattle([])
        setEBattle([])
        setPWar([])
        setEWar([])
        setERounds(updatedCards.length/2)
      }, delay)

    } else {
      setTimeout(()=>{
        warPrepPhase()
      }, delay)
      
    }

  }
  // ---compare phase
  
  // mission end---
  function endPhase() {
    if (pRounds > eRounds) {
      console.log(`You've completed the Mission!`)
    } else if (pRounds < eRounds) {
      console.log(`You've failed the Mission!`)
    } else {
      console.log(`Strategic Retreat!`)
    }
  }
  // ---mission end
  
  console.log(`player Platoon`, pPlatoon.slice(-3))
  console.log(`enemy Platoon`, ePlatoon.slice(-3))
  
  console.log(`player Battle`, pBattle)
  console.log(`enemy Battle`, eBattle)
  
  console.log(`player reserves`, pReserves)
  console.log(`enemy reserves`, eReserves)
  
  console.log(`player War`, pWar)
  console.log(`enemy War`, eWar)
  
  if (pReserves.length + eReserves.length > 50) endPhase()
    
  return (
    <>
    <h2>Play!</h2>
    <button onClick={handleShuffleDeck}>Shuffle Deck</button>
    <button onClick={handleDealCards}>Deal Cards</button>
    <div className="container">
      <div className="m">menu</div>
      
      <div className="eR">eReserves
        <Pile pile={eReserves} />
      </div>
      
      <div className="eD">eDisplay
        <div>
          Score: {eRounds}
        </div>
      </div>
      
      <div className="eP">
        ePlatoon
        {ePlatoon?.length ? <img src={backOfCard} /> : null}
      </div>
      
      <div className="eW">eWar
        <Pile pile={eWar} />
      </div>
      
      <div className="eB">eBattle
        <Pile pile={eBattle} />
      </div>
      
      <div className="pD">pDisplay
        <div>
          Score: {pRounds}
        </div>
      </div>
      
      <div className="pP">pPlatoon
        {pPlatoon?.length ? <img src={backOfCard} /> : null}
      </div>
      
      <div className="pB">pBattle
        <Pile pile={pBattle} />
      </div>
        
      <div className="pW">pWar
        <Pile pile={pWar} />
      </div>
      
      <div className="pR">pReserves
        <Pile pile={pReserves} />
      </div>
      
      <div className="pA">
        pActions
        <button className="action-button battle" onClick={handlePrep}>Prep</button>
        <button className="action-button battle" onClick={handleBattle}>Battle!</button>
      </div>
      
      <div className="i">
        pInfo
      </div>
      
      <div className="a">
        actions
      </div>
    </div>
    </>
  )
}