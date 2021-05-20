import React from 'react';
import { Animated } from "react-animated-css";

export default function GameDescription(props) {
	const { game } = props;
	return (
		<Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
			<div className="game-description text-default">
				<h3>{game.name}</h3>
				<p>Created by {game.author}</p>
				<h4>You will learn about {game.category}</h4> 
				<h4>You will have to complete a {game.type}!</h4>
				<h4>{game.description}</h4>
			</div>
		</Animated>
	);
};
