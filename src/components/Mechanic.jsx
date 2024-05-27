import './Mechanic.css'
import MechanicFeature from './MechanicFeature.jsx'

export default function Mechanic({mechanic}) {
  const { title, features } = mechanic

  return(
    <div className="mechanic">
      <p className="mechanic-title">{title}</p>
      {features.map(feature => (
        <MechanicFeature feature={feature} key={feature.title} />
      ))}
    </div>
  )
}