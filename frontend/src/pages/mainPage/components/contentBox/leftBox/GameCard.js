import React from 'react';
import { BsQuestionSquare } from "react-icons/bs";
import { Animated } from "react-animated-css";  //niki

export default function GameCard(props) {
	const { game, onMouseEnter, setPagePointer } = props;
	const { name, category, type, author, description } = game;
	return (
		<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
			<div
				className="game-card card-rotate btn btn-background-slide" //niki
				onMouseEnter={() => onMouseEnter(name)}
				onClick={() => {
					setPagePointer(name);
				}}
			>
				<div>
					<button className="btn btn-background-slide">
						<h4>{name}</h4>
						<hr></hr>
						<h2>{category}</h2>
						<BsQuestionSquare className="icon-button" />
					</button>
				</div>
			</div>
		</Animated>
	);
}
