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
	const [disabled, setDisabled] = useState(false)
	const [matchFound, setMatching] = useState("")

	const reorderDeck = () => {
		const newDeck = [...deck, ...deck]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({...card, id: Math.random()}))

		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(newDeck)
		setTurns(0)
	}

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		if(choiceOne && choiceTwo) { // if two cards are selected
			setDisabled(true) // makes it impossible to click on other cards if two cards are already being checked
			if (choiceOne.src === choiceTwo.src){ // if those cards are the same
				setCards(
					prevCards => {
						return prevCards.map( // grab the data structure that holds all the cards
							card => { // for each card in the structure
								if (card.src === choiceOne.src) { // if the card's src is the same as the one that was picked
									setMatching("Yes!")
									return{...card, matched: true} // change the matched value of the card to true
								} else {
									return card
								}
							}
						)
					}
				)
				resetTurn()
			} 	else {
				setMatching("No!")
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	console.log(cards)

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
		setDisabled(false)
		setMatching("")
	}

	useEffect(() => {
		reorderDeck()
	}, [])

	return (
		<div className="App">
			<h1>The Flags Memory Game</h1>
			<button onClick={reorderDeck}>New Game</button>
			<h3>Match Found? {matchFound}</h3>
			<div className='card-grid'>
				{
					cards.map(
						card => (
							<Card 
								key={card.id} 
								card={card} 
								handleChoice={handleChoice} 
								flipped={card === choiceOne || card == choiceTwo || card.matched}
								disabled={disabled}
							/>
						)
					)
				}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
