import './Sandbox.css'
import { useState, useStack } from 'react'
import { useForm } from 'react-hook-form'
import { shuffleDeck, drawFromDeck } from '../utils/deckFetch.js'
import Card from './Card.jsx'

export default function Sandbox(){
  const [ deck, setDeck ] = useState({})
  const [ cardsDrawnFromDeck, setCardsDrawnFromDeck] = useState({})

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

  const watchNumCardsToDraw = watch("numCardsToDraw")

  function handleShuffleDeck() {
    setCardsDrawnFromDeck({})
    shuffleDeck()
    reset()
  }

  function onSubmit(input) {
    const num = input.numCardsToDraw

    drawFromDeck(num)
    .then(deck => {
      setCardsDrawnFromDeck(deck)
    })
    .catch(err => console.error(err))
  }

  function handleDrawFromDeck() {
    drawFromDeck()
      .then(deck => {
        console.log(deck)
        setCardsDrawnFromDeck(deck)
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h2>Sandbox</h2>
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      <form className="card-draw-form" onSubmit={handleSubmit(onSubmit)}>
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
        <h3>Card(s) Drawn From Deck:</h3>
        <div className="cards">
          {cardsDrawnFromDeck.cards?.map(card => (
            <Card card={card} key={card.code}/>
          ))}
        </div>
        <h3>Cards Remaining in Deck: {cardsDrawnFromDeck?.remaining || 52}</h3>
      </div>
    </>
  )
}