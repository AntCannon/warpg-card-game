import Card from './Card.jsx'
import { useState } from 'react'

export default function CardsDrawnFromDeck({
  player,
  pile,
  handleGetPileInfo
}) {

  return (
    <>
      <div className={`${player} platoon cards`} id={`${player}PlatoonPile`}>
        <div className={`${player}-platoon soldiers`}>
          {pile?.map(card => {
            // card.isFaceUp = false;
            return <Card
              card={card}
              key={card.code}
            />
          })}
        </div>
        {/* <button onClick={handleGetPileInfo}>Get Platoon Info</button> */}
      </div>
    </>
  )
}