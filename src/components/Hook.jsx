import './Hook.css'
import FeatureImage from './FeatureImage.jsx'

export default function Hook() {
  
  return (
    <section className="hook">
      <div className="images">
        <FeatureImage feature={"WIN BATTLES"}/>
        <FeatureImage feature={"EARN EXPERIENCE"}/>
        <FeatureImage feature={"EARN COINS"}/>
      </div>
      <p>Play the Classic Card Game reimagined with RPG and Casino elements!</p>
    </section>
  )
}