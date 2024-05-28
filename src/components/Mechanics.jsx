import './Mechanics.css'
import Mechanic from './Mechanic.jsx'
import mechanics from '../copy/mechanics.json'

export default function Mechanics() {

  return(
    <section className="mechanics">
      {mechanics.map(mechanic => (
        <Mechanic mechanic={mechanic} key={mechanic.title} />
      ))}
    </section>
  )
}