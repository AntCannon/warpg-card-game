import Card from './Card.jsx'
import { useState } from 'react'

export default function CardsDrawnFromDeck({
  cardsDrawnFromDeck,
  areCardsDrawnFromDeckFaceUp,
  faceUpTrigger
}) {

  return (
    <>
      <h3>Card(s) Drawn From Deck:</h3>
      <div className="cards-drawn-from-deck">
        {cardsDrawnFromDeck.cards?.map(card => {
          card.isFaceUp = false;
          return <Card
            card={card}
            key={card.code}
            areCardsDrawnFromDeckFaceUp={areCardsDrawnFromDeckFaceUp}
            faceUpTrigger={faceUpTrigger}

          />
        })}
      </div>
    </>
  )
}