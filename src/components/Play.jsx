import './Play.css'
const backOfCard = "https://deckofcardsapi.com/static/img/back.png"

export default function Play({
  p1Platoon,
  p2Platoon,

}) {

  console.log(`p1P`, p1Platoon)

  return (
    <>
    <h2>Play!</h2>
    <div className="container">
      <div className="m"></div>
      <div className="eR"></div>
      <div className="eD"></div>
      <div className="eP">
        {p2Platoon?.length ? <img src={backOfCard} /> : null}
      </div>
      <div className="psW"></div>
      <div className="eB"></div>
      <div className="pD"></div>
      <div className="pP">
        {p1Platoon?.length ? <img src={backOfCard} /> : null}
      </div>
      <div className="pB"></div>
      <div className="pW"></div>
      <div className="pR"></div>
      <div className="pA"></div>
      <div className="i"></div>
      <div className="a"></div>
    </div>
    </>
  )
}