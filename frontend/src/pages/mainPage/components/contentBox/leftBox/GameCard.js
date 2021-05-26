import React from 'react';
import { BsQuestionSquare } from "react-icons/bs";
import { Animated } from "react-animated-css";  //niki
// import { ReactFitty } from "react-fitty";
import styles from '../../../../../app.module.css';

export default function GameCard(props) {
	const { game, onMouseEnter, setPagePointer } = props;
	const { name, category } = game;
	return (
		<div
			className={styles["game-card"]} 
			onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
			onClick={() => {
				setPagePointer(name);
			}}
		>
			<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
				<button className={styles["btn-background-slide"]}>
					<h4>{name}</h4>
					<hr></hr>
					<h2>{category}</h2>
					{/* <BsQuestionSquare className={styles["icon-button"]} /> */}
				</button>
			</Animated>
		</div>
	);
};
