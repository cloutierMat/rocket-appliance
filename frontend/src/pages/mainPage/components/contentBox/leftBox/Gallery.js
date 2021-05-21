import React from 'react';
import GameCard from './GameCard';
import styles from '../../../../../app.module.css';

export default function Gallery(props) {
	const { onMouseEnter, setPagePointer, gameList } = props;
	return (
		<div className={styles["gallery-wrapper"]}>
			<div className={styles.gallery}>
				{gameList && gameList.map(game => {
					return (
						<GameCard
							key={game.name}
							game={game}
							onMouseEnter={onMouseEnter}
							setPagePointer={setPagePointer}
						/>
					);
				})}
			</div>
		</div>
	);
}
