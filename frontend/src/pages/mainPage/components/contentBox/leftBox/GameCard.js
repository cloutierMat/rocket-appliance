import React from 'react';

export default function GameCard(props) {
	const { name } = props;
	return (
		<div className="game-card">{name}</div>
	);
}