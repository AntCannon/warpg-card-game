import './MechanicFeature.css'

export default function MechanicFeature({feature}) {
  const { title, caption } = feature

  return (
    <div className="mechanic-feature">
      <p>{title}</p>
      <p>{caption}</p>
    </div>
  )
}