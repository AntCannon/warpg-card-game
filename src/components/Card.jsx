import { useState, useEffect } from 'react'

const backOfCard = "https://deckofcardsapi.com/static/img/back.png"

export default function Card ({
  card,
  areCardsDrawnFromDeckFaceUp,
  faceUpTrigger
}) {

  const [ localCard, setLocalCard ] = useState(card)

  const {
    code,
    image,
    value,
    suit,
    isFaceUp
  } = localCard

  function handleCardFlip() {
    localCard.isFaceUp = !localCard.isFaceUp
    setLocalCard({...localCard})
  }

  useEffect(() =>{
    if (areCardsDrawnFromDeckFaceUp) {
      localCard.isFaceUp = localCard.isFaceUp || true
      setLocalCard({...localCard})
    }
  }, [faceUpTrigger])

  return(
    <div>
      <img
        className="card"
        src={localCard.isFaceUp ? image : backOfCard}
        onClick={handleCardFlip}
        alt={localCard.isFaceUp ? `${value} of ${suit}` : "Back of card"} />
    </div>
  )
}