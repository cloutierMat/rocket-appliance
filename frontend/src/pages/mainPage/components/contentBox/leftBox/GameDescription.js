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
		<div>
		
			{gameToDisplay &&
				<Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
					<div className={`${styles["game-description"]} ${styles["text-default"]}`}>
						<h3>{gameToDisplay.name}</h3>
						<p>Created by {gameToDisplay.author}</p>
						<hr></hr>
						<div>
							<h4>Learn about {gameToDisplay.category} by playing {gameToDisplay.name} {gameToDisplay.type}<br /> {gameToDisplay.description}</h4>
						</div>
					</div>
				</Animated>
			}		
		
		</div>
	);
};
