import React from 'react';
import { BsQuestionSquare } from "react-icons/bs";
import {Animated} from "react-animated-css";  //niki

export default function GameCard(props) {
	const { name, onMouseEnter, setPagePointer } = props;
	return (
		<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
		<div
			className="game-card card-rotate btn btn-background-slide" //niki
			onMouseEnter={onMouseEnter}
			onClick={() => {
				setPagePointer(name);
			}}
		>
	<div>
		<button className="btn btn-background-slide"><h4>Rocket Science</h4><hr></hr><h2>Trivia</h2><BsQuestionSquare className="icon-button"/></button> 
	</div>
			{name}
		</div>
		</Animated>
	);
}
