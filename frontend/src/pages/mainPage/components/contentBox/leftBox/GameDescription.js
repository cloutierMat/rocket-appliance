import React from 'react';
import { Animated } from "react-animated-css";

export default function GameDescription(props) {
	const { game } = props;
	return (
		<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
			<div className="game-description text-default">{game.name}
			</div>
		</Animated>
	);
};
