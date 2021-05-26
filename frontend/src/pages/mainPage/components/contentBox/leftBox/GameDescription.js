import React from 'react';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function GameDescription(props) {
	const { game } = props;
	return (
		<div> 
			<Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
				<div className={`${styles["game-description"]} ${styles["text-default"]}`}>
					<h3>{game.name}</h3>
					<p>Created by {game.author}</p>
					<hr></hr>
				<div>
				<h4>Learn about {game.category} by playing {game.name} {game.type}<br/> {game.description}</h4>
				</div>
				</div>
			</Animated>
		</div>
	);
};
