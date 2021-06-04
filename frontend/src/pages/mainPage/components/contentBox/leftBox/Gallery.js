import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../../../../context/GameContext';
import GameCard from './GameCard';
import styles from '../../../../../app.module.css';
import { Animated } from "react-animated-css";

export default function Gallery(props) {
	const { onMouseEnter } = props;

	const gameCtx = useContext(GameContext);
	const [gameList, setGameList] = useState([]);

	const [filteredList, setFilteredList] = useState();

	useEffect(() => {
		if (!gameList.length && gameCtx.filteredByApproved.length) {
			setGameList([...gameCtx.filteredByApproved].sort(() => Math.random() - 0.5));
		}
	}, [gameList, gameCtx.filteredByApproved]);

	useEffect(() => {
		const updatedList = gameList.filter(game => gameCtx.filteredByFragment.includes(game.name));
		setFilteredList(updatedList);
	}, [gameCtx.filteredByFragment, gameList]);

	// const gameList = gameCtx.filteredByFragment;
	return (
		<div className={styles["gallery-wrapper"]}>
			<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
				<div className={styles.gallery}>
					{filteredList && filteredList.map((game, index) => {
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
