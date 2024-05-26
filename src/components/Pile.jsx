const backOfCard = "https://deckofcardsapi.com/static/img/back.png"

export default function Pile({pile}) {
  
  return(
    <>
      {pile.length ? <img src={pile[pile.length-1]?.isFaceUp ? pile[pile.length-1].image : backOfCard} /> : null}
    </>
  )
}