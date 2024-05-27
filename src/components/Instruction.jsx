import './Instruction.css'

export default function Instruction({instruction}) {
  const { title, text } = instruction

  return (
    <div className="instruction">
      <div className="instruction-text">
        <p>{title}</p>
        <p>{text}</p>
      </div>
      <div className="instruction-image"></div>
    </div>
  )
}