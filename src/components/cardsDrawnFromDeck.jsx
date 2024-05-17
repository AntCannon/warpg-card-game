import Card from './Card.jsx'

export default function Deck({
  deck,
  cardsDrawnFromDeck
}) {

  return (
    <div className="deck">
      {cardsDrawnFromDeck.cards?.map(card => (
        <Card card={card} key={card.code}/>
      ))}
    </div>
  )
}