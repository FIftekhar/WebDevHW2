import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import Card from './components/Card';


const deck = [
	{"src": "/img/ban.png", matched: false },
	{"src": "/img/bri.png", matched: false },
	{"src": "/img/can.png", matched: false },
	{"src": "/img/ger.png", matched: false },
	{"src": "/img/mor.png", matched: false },
	{"src": "/img/sin.png", matched: false },
	{"src": "/img/usa.png", matched: false },
	{"src": "/img/yem.png", matched: false }
]

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)

	const reorderDeck = () => {
		const newDeck = [...deck, ...deck]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({...card, id: Math.random()}))

		setCards(newDeck)
		setTurns(0)
	}

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		if(choiceOne && choiceTwo) {

			if (choiceOne.src === choiceTwo.src){
				setCards(prevCards => {
					return prevCards.map(card => {
						if(card.src === choiceOne.src){
							return{...card, matched: true}
						} else {
							return card
						}
						})
				})
				resetTurn()
			} 	else {
				resetTurn()
			}
		}
	}, [choiceOne, choiceTwo])

	console.log(cards)

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
	}

	console.log(cards, turns)

	return (
		<div className="App">
			<h1>The Flags Memory Game</h1>
			<button onClick={reorderDeck}>New Game</button>

			<div className='card-grid'>
				{
					cards.map(
						card => (
							<Card 
							key={card.id}
							 card={card}
							 handleChoice={handleChoice}
							 />
						)
					)
				}
			</div>
		</div>
	);
}

export default App;
