import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';


const deck = [
	{"src": "/img/ban.png"},
	{"src": "/img/bri.png"},
	{"src": "/img/can.png"},
	{"src": "/img/ger.png"},
	{"src": "/img/mor.png"},
	{"src": "/img/sin.png"},
	{"src": "/img/usa.png"},
	{"src": "/img/yem.png"}
]

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)

	const reorderDeck = () => {
		const newDeck = [...deck, ...deck]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({...card, id: Math.random()}))

		setCards(newDeck)
		setTurns(0)
	}

	console.log(cards, turns)

	return (
		<div className="App">
			<h1>The Flags Memory Game</h1>
			<button onClick={reorderDeck}>New Game</button>
		</div>
	);
}

export default App;
