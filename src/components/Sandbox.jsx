import './Sandbox.css'
import { useState, useStack } from 'react'
import { useForm } from 'react-hook-form'
import { shuffleDeck, drawFromDeck } from '../utils/deckFetch.js'
import CardsDrawnFromDeck from './cardsDrawnFromDeck.jsx'
import Card from './Card.jsx'

export default function Sandbox(){
  // config ---
  const [ deck, setDeck ] = useState({})
  const [ cardsDrawnFromDeck, setCardsDrawnFromDeck] = useState({})
  const [ areCardsDrawnFromDeckFaceUp, setAreCardsDrawnFromDeckFaceUp ] = useState(false)
  const [ faceUpTrigger, setFaceUpTrigger ] = useState(false)

  const cardDrawForm = useForm({
    defaultValues: {
      numCardsToDraw: 1,
    }
  })

  const {
    register,
    watch,
    handleSubmit,
    formState,
    reset,
    control,
  } = cardDrawForm;
  
  // end config ---

  function handleShuffleDeck() {
    setCardsDrawnFromDeck({})
    shuffleDeck()
    reset()
  }
  
  const watchNumCardsToDraw = watch("numCardsToDraw")

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
            deck={deck}
            cardsDrawnFromDeck={cardsDrawnFromDeck}
            areCardsDrawnFromDeckFaceUp={areCardsDrawnFromDeckFaceUp}
            faceUpTrigger={faceUpTrigger}
             />
          <button
            onClick={handleSetCardsFaceUp}>Flip Cards Up</button>
        <h3>Cards Remaining in Deck: {cardsDrawnFromDeck?.remaining || 52}</h3>
      </div>
    </>
  )
}