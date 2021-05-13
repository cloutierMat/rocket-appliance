import React from 'react';

export default function GameCard(props) {
	const { name, onMouseEnter, setPagePointer } = props;
	return (
		<div
			className="game-card card-rotate"
			onMouseEnter={onMouseEnter}
			onClick={() => {
				setPagePointer(name);
			}}
		>
			{name}
		</div>
	);
}
