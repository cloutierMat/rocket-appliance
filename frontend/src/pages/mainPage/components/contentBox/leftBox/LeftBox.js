import React, { useState } from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';
import { Animated } from "react-animated-css";

export default function LeftBox(props) {
	const { setPagePointer, gameList } = props;
	const [hoverOnCard, setHoverOnCard] = useState(false); //temporary false value for hovering over game cards
	const [gameHovered, setGameHovered] = useState();

	function handleHover(name) {
		setHoverOnCard(true);
		setGameHovered(gameList.find(game => game.name === name));
	}

	return (
		<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
			<div className="left-box">
				<Gallery onMouseEnter={handleHover} setPagePointer={setPagePointer} gameList={gameList} />
				{hoverOnCard ? <GameDescription game={gameHovered} /> : <></>}
			</div>
		</Animated>
	);
}
