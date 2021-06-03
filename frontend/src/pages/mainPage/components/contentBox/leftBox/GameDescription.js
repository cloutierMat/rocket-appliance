import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../../../../context/GameContext';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function GameDescription(props) {
	const { game } = props;

	const [gameToDisplay, setGameToDisplay] = useState();
	const gameCtx = useContext(GameContext);

	useEffect(() => {
		setGameToDisplay(gameCtx.filteredByApproved.find(elem => elem.name === game));
	}, [game, gameCtx.filteredByApproved]);

	const descriptionContent =
		gameToDisplay &&
		<Animated animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
			<div className={`${styles["game-description"]} ${styles["text-default"]}`}>
				<h3>{gameToDisplay.name}</h3>
				<p>Created by {gameToDisplay.author}</p>
				<hr></hr>
				<h4>Learn about {gameToDisplay.category} by playing {gameToDisplay.name} {gameToDisplay.type}<br /> {gameToDisplay.description}</h4>
				<br />
				<h4>{gameToDisplay.questions.length === 1
					? `There is ${gameToDisplay.questions.length} question!`
					: `There are ${gameToDisplay.questions.length} questions!`
				}
				</h4>
			</div>
		</Animated>;


	if (!gameCtx.filteredByFragment.length) {

	}

	return (
		<div>
			{ gameCtx.filteredByFragment.length && descriptionContent}
		</div>
	);
};
