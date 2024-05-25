import './Play.css'
import Pile from './Pile.jsx'
const backOfCard = "https://deckofcardsapi.com/static/img/back.png"

export default function Play({
  pPlatoon,
  ePlatoon,
  pBattle,
  eBattle,
  handlePrepPhase
}) {

  return (
    <>
    <h2>Play!</h2>
    <div className="container">
      <div className="m"></div>
      <div className="eR"></div>
      <div className="eD"></div>
      <div className="eP">
        {ePlatoon?.length ? <img src={backOfCard} /> : null}
      </div>
      <div className="eW"></div>
      <div className="eB">
        <Pile
          player="e"
          pile={eBattle}
        />
      </div>
      <div className="pD"></div>
      <div className="pP">
        {pPlatoon?.length ? <img src={backOfCard} /> : null}
      </div>
      <div className="pB">
        <Pile
          player="p"
          pile={pBattle}
        />
      </div>
      <div className="pW"></div>
      <div className="pR"></div>
      <div className="pA">
        <button className="action-button battle" onClick={handlePrepPhase}>Battle!</button>
      </div>
      <div className="i"></div>
      <div className="a">
      </div>
    </div>
    </>
  )
}