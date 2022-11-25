import './Card.css'

export default function SingleCard({card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div>
            <div className="card">
				<div className={flipped ? "flipped" : ""}>
					<img className="card-face" src={card.src} />
					<img className='card-back' src={"/img/globe.png"} onClick={handleClick} alt="card back" />
				</div>
			</div>
        </div>
    )
}