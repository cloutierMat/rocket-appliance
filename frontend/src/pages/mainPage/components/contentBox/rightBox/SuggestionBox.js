import React from 'react';
import GameCard from '../leftBox/GameCard';
import GameDescription from '../leftBox/GameDescription';
import styles from '../../../../../app.module.css';

export default function SuggestionsBox(props) {
	const { gameList, setPagePointer } = props;
	let tryThisOutForAChange;
	const game = () => gameList[Math.floor(Math.random() * (gameList.length))];
	return (
		<div className={styles["suggestion-box"]}>
			{gameList && (tryThisOutForAChange = game()) &&
				< section className={styles["card-reducer"]}>
					<GameCard game={tryThisOutForAChange} setPagePointer={setPagePointer} />
					<GameDescription game={tryThisOutForAChange} />
				</section>
			}
		</div >);
}