import React from 'react';
import { BsQuestionSquare } from "react-icons/bs";
import { Animated } from "react-animated-css";  //niki
import { ReactFitty } from "react-fitty";
import styles from '../../../../../app.module.css';

export default function GameCard(props) {
	const { game, onMouseEnter, setPagePointer } = props;
	const { name, category } = game;
	return (
		<div
			className={styles["game-card"]} //niki
			onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
			onClick={() => {
				setPagePointer(name);
			}}
		>
			<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
				<button className={styles["btn-background-slide"]}>
					<h4><ReactFitty wrapText={true}>{name}</ReactFitty></h4>
					<hr></hr>
					<h2><ReactFitty wrapText={true}>{category}</ReactFitty></h2>
					<BsQuestionSquare className={styles["icon-button"]} />
				</button>
			</Animated>
		</div>
	);
};
