import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../../../../context/GameContext';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function GameDescription(props) {
	const { game } = props;

	const [gameToDisplay, setGameToDisplay] = useState();

	const gameCtx = useContext(GameContext);

	useEffect(() => {
		setGameToDisplay(gameCtx.list.find(elem => elem.name === game));
	}, [game]);

	return (
		<div className={`${styles["game-description"]} ${styles["text-default"]}`}>
			{ gameToDisplay &&
				<Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
					<h3>{gameToDisplay.name}</h3>
					<p>Created by {gameToDisplay.author}</p>
					<h4>You will learn about {gameToDisplay.category}</h4>
					<h4>You will have to complete a {gameToDisplay.type}!</h4>
					<h4>{gameToDisplay.description}</h4>
				</Animated>
			}
		</div>
	);
};
