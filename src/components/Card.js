import './Card.css'

export default function SingleCard({card}) {
    return (
        <div>
            <div className="card">
				<div>
					<img className="card-face" src={card.src} />
					<img className='card-back' src={"/img/globe.png"} />
				</div>
			</div>
        </div>
    )
}