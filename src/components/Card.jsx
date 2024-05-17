export default function Card ({ card }) {
  const {
    code,
    image,
    value,
    suit
  } = card

  return(
    <div className="card">
      <img className="card" src={image} key={code} />
    </div>
  )
}