import React from 'react';

export default function GameCard(props) {
	const { name, onMouseEnter } = props;
	return (
		<div className="game-card card-rotate" onMouseEnter={onMouseEnter}>
			{name}
		</div>
	);
}
