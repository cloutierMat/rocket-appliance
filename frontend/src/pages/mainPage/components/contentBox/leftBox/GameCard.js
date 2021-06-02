import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";  //niki
// import { ReactFitty } from "react-fitty";
import styles from '../../../../../app.module.css';
import { GoTasklist } from "react-icons/go";

export default function GameCard(props) {
	const { game, onMouseEnter, index } = props;
	const { name, category } = game;
	const [classToApply, setClassToApply] = useState();

	useEffect(() => {
		setClassToApply(`color-${Math.ceil(Math.random() * 2) + (2 * (index % 2))}`);
	}, [index]);

	return (
		<Link to={`/trivia/${name}`}>
			<div
				className={styles["game-card"]}
				onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
			>
				<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
					<button className={`${styles["btn-background-slide"]} ${styles[classToApply]}`}>
						<h4>{name}</h4>
						<hr></hr>
						<h2>{category}</h2>
						<GoTasklist />
					</button>
				</Animated>
			</div>
		</Link>
	);
};
