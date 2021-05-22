import React from 'react';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function GameDescription(props) {
	const { game } = props;
	return (
		<div className={`${styles["game-description"]} ${styles["text-default"]}`}>
			<Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
				<h3>{game.name}</h3>
				<p>Created by {game.author}</p>
				<h4>You will learn about {game.category}</h4>
				<h4>You will have to complete a {game.type}!</h4>
				<h4>{game.description}</h4>
			</Animated>
		</div>
	);
};
