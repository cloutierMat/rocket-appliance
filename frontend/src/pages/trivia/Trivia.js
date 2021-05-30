import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GameContext from '../../context/GameContext';
import Questions from './Questions';
import TriviaEnding from './TriviaEnding';
import './trivia.css';
import { Animated } from "react-animated-css";

export default function Trivia() {
	const [category, setCategory] = useState();
	const [name, setName] = useState();
	const [questions, setQuestions] = useState();
	const [author, setAuthor] = useState();
	const [isEndReached, setIsEndReached] = useState();

	const gameCtx = useContext(GameContext);

	const { gameName } = useParams();

	useEffect(() => {
		if (!gameCtx.list.length) return;
		console.log("gameCtx.list", gameCtx.list);
		const triviaToDisplay = gameCtx.list.find(elem => elem.name === gameName);
		console.log(triviaToDisplay);
		setCategory(triviaToDisplay.category);
		setName(triviaToDisplay.name);
		setAuthor(triviaToDisplay.author);
		setQuestions(triviaToDisplay.questions);
		setIsEndReached(false);
	}, [gameCtx]);

	return (
		<div className="trivia-page">
			<Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
				<div className="info-wrapper">
					<h1>{category} </h1>
					<h2 className="trivia-title">{name}</h2>
					<hr />
					<p>Created by {author}</p>
				</div>
				{questions && !isEndReached && <Questions questions={questions} setIsEndReached={setIsEndReached} />}
				{questions && isEndReached && <TriviaEnding questions={questions} />}
			</Animated>
		</div>
	);
}