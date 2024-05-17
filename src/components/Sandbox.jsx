import './Sandbox.css'
import { useState, useStack } from 'react'
import { useForm } from 'react-hook-form'
import { shuffleDeck, drawFromDeck } from '../utils/deckFetch.js'

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
  console.log(watchNumCardsToDraw)

  function handleShuffleDeck() {
    shuffleDeck()
    reset()
  }

  function onSubmit(input) {
    const num = input.numCardsToDraw

    drawFromDeck(num)
    .then(deck => {
      console.log(deck)
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
      Sandbox
      <button onClick={handleShuffleDeck}>Shuffle Deck</button>
      <form className="card-draw-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Number of Cards to Draw:
          <br />
          <input
            className="input-deck-draw-count"
            type="number"
            id="numCardsToDraw"
            {...register("numCardsToDraw")}
          />
        </label>
        <button type="submit">Draw {watchNumCardsToDraw} Card(s) from Deck</button>
      </form>
      <div>
        Card(s) Drawn From Deck: 
        <div className="cards">
          {cardsDrawnFromDeck.cards?.map(({code, image}) => (
            <img className="card" src={image} key={code} />
          ))}
        </div>
        Cards Remaining in Deck: {cardsDrawnFromDeck?.remaining}
      </div>
    </>
  )
}