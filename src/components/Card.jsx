import { useState } from 'react'

export default function Card ({ card }) {
  const {
    code,
    image,
    value,
    suit
  } = card

  const [ isFaceUp, setIsFaceUp ] = useState(false)

  const backOfCard = "https://deckofcardsapi.com/static/img/back.png"

  function handleCardFlip() {
    setIsFaceUp(!isFaceUp)
  }

  return(
    <div className="card">
      <img
        className="card"
        src={isFaceUp ? image : backOfCard}
        onClick={handleCardFlip}
        alt={isFaceUp ? `${value} of ${suit}` : "Back of card"} />
    </div>
  )
}