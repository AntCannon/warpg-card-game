import './Sandbox.css'
import { useState, useStack } from 'react'
import { useForm } from 'react-hook-form'
import { shuffleDeck, drawFromDeck } from '../utils/deckFetch.js'

export default function Sandbox(){
  const [ deck, setDeck ] = useState({})
  const [ cardsDrawnFromDeck, setCardsDrawnFromDeck] = useState({
    remaining: "",
    cards: []
  })

  const cardDrawForm = useForm({
    defaultValues: {
      numCardsToDraw: 1,
    }
  })

  const {
    register,
    control,
    handleSubmit,
    formState,
    reset
  } = cardDrawForm;

  function handleShuffleDeck() {
    shuffleDeck()
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
        <button type="submit">Draw Card from Deck</button>
      </form>
      <div>
        Card(s) Draw From Deck: 
        <div className="cards">
          {cardsDrawnFromDeck.cards.map(({code, image}) => (
            <img className="card" src={image} key={code} />
          ))}
        </div>
        Cards Remaining in Deck: {cardsDrawnFromDeck.remaining}
      </div>
  
      
    </>
  )
}