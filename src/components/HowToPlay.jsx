import Instruction from './Instruction.jsx'
import howToPlay from '../copy/howToPlay.json'

export default function HowToPlay() {
  console.log(howToPlay)
  
  return (
    <section className="how-to-play">
      {howToPlay.map(instruction => (
        <Instruction instruction={instruction} key={instruction.title} />
      ))}
    </section>
  )
}