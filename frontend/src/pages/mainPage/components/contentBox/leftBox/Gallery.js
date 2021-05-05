import React from 'react';
import GameCard from './GameCard';

export default function Gallery() {
	return (
		<div className="gallery">
			{[1, 2, 3, 4, 5, 6, 8, 9, 10].map((name) => {
				return <GameCard name={name} />;
			})}
		</div>
	);
}
