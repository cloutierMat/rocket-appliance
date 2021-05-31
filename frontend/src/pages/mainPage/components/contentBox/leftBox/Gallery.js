import React, { useContext } from 'react';
import GameContext from '../../../../../context/GameContext';
import GameCard from './GameCard';
import styles from '../../../../../app.module.css';
import { Animated } from "react-animated-css";

export default function Gallery(props) {
	const { onMouseEnter } = props;

	const gameCtx = useContext(GameContext);
	const gameList = gameCtx.filteredByFragment;

	return (
		<div className={styles["gallery-wrapper"]}>
			<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
				<div className={styles.gallery}>
					{gameList && gameList.map((game, index) => {
						return (
							<GameCard
								key={game.name}
								game={game}
								onMouseEnter={onMouseEnter}
								index={index}
							/>
						);
					})}
				</div>
			</Animated>
		</div>
	);
}
