import React from 'react';
import GameCard from '../leftBox/GameCard';
import GameDescription from '../leftBox/GameDescription';

export default function SuggestionsBox(props) {
	const { gameList, setPagePointer } = props;
	let tryThisOutForAChange;
	const game = () => gameList[Math.floor(Math.random() * (gameList.length))];
	return (
		<div className="suggestion-box">
			{gameList && (tryThisOutForAChange = game()) &&
				< section className="card-reducer">
					<GameCard game={tryThisOutForAChange} setPagePointer={setPagePointer} />
					<GameDescription game={tryThisOutForAChange} />
				</section>
			}
		</div >);
}