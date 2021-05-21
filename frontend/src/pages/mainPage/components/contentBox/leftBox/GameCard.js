import React from 'react';
import { BsQuestionSquare } from "react-icons/bs";
import { Animated } from "react-animated-css";  //niki
import { ReactFitty } from "react-fitty";

export default function GameCard(props) {
	const { game, onMouseEnter, setPagePointer } = props;
	const { name, category } = game;
	return (
		<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
			<div
				className="game-card card-rotate btn btn-background-slide" //niki
				onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
				onClick={() => {
					setPagePointer(name);
				}}
			>
				<div>
					<button className="btn btn-background-slide">
						<h4><ReactFitty wrapText={true}>{name}</ReactFitty></h4>
						<hr></hr>
						<h2><ReactFitty wrapText={true}>{category}</ReactFitty></h2>
						<BsQuestionSquare className="icon-button" />
					</button>
				</div>
			</div>
		</Animated>
	);
}
