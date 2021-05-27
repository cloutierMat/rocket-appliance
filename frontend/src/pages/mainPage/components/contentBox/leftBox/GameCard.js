import React from 'react';
import { Link } from 'react-router-dom';
import { BsQuestionSquare } from "react-icons/bs";
import { Animated } from "react-animated-css";  //niki
// import { ReactFitty } from "react-fitty";
import styles from '../../../../../app.module.css';
import { GoTasklist } from "react-icons/go";

export default function GameCard(props) {
	const { game, onMouseEnter } = props;
	const { name, category } = game;
	return (
		<Link to={`/trivia/${name}`}>
			<div
				className={styles["game-card"]}
				onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
			>
				<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
					<button className={styles["btn-background-slide"]}>
						<h4>{name}</h4>
						<hr></hr>
						<h2>{category}</h2>
						<GoTasklist />
						{/* <BsQuestionSquare className={styles["icon-button"]} /> */}
					</button>
				</Animated>
			</div>
		</Link>
	);
};
