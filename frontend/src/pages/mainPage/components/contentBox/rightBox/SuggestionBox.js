import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../../../../context/GameContext';
import GameCard from '../leftBox/GameCard';
import GameDescription from '../leftBox/GameDescription';
import styles from '../../../../../app.module.css';

export default function SuggestionsBox() {
	const [gameToDisplay, setGameToDisplay] = useState();

	const gameCtx = useContext(GameContext);

	useEffect(() => {
		const list = gameCtx.filteredByApproved;
		if (!list) return;
		const game = () => list[Math.floor(Math.random() * (list.length))];
		setGameToDisplay(game);
	}, [gameCtx.filteredByApproved]);

	return (
		<div className={styles["suggestion-box"]}>
			{gameToDisplay &&
				<section className={styles["card-reducer"]}>
					<GameCard game={gameToDisplay} />
					<GameDescription game={gameToDisplay} />
				</section>
			}
		</div>);
}