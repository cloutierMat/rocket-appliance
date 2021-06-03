import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GameContext from '../../context/GameContext';
import Questions from './Questions';
import TriviaEnding from './TriviaEnding';
import styles from '../../app.module.css';
import './trivia.css';
import { Animated } from "react-animated-css";

export default function Trivia() {

	const gameCtx = useContext(GameContext);

	const [gameList, setGameList] = useState(gameCtx.filteredByApproved);
	const [category, setCategory] = useState();
	const [name, setName] = useState();
	const [questions, setQuestions] = useState();
	const [author, setAuthor] = useState();
	const [isEndReached, setIsEndReached] = useState();

	const { gameName } = useParams();

	useEffect(() => {
		if (!gameList.length) return;
		const triviaToDisplay = gameList.find(elem => elem.name === gameName);
		setCategory(triviaToDisplay.category);
		setName(triviaToDisplay.name);
		setAuthor(triviaToDisplay.author);
		setQuestions(triviaToDisplay.questions);
		setIsEndReached(false);
	}, [gameList, gameName]);

	return (
		<div className="trivia-page">
			<ul className={`${styles["game-rules"]} user-righteousness`}>
				<li>Don't forget to click the link!</li>
				<li>And most importantly, learning is meant to be fun!</li>
			</ul>
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