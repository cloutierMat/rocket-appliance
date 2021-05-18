import React from 'react';
import GameCard from './GameCard';

export default function Gallery(props) {
	const { onMouseEnter, setPagePointer, gameList } = props;
	return (
		<div className="gallery-wrapper">
			<div className="gallery">
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
