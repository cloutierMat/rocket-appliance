import React, { useState } from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';
import { Animated } from "react-animated-css";

export default function LeftBox(props) {
	const { setPagePointer, gameList } = props;
	const [hoverOnCard, setHoverOnCard] = useState(false); //temporary false value for hovering over game cards

	function handleHover() {
		setHoverOnCard(true);
		console.log('Hi WILL');
	}

	return (
		<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
			<div className="left-box">
				<Gallery onMouseEnter={handleHover} setPagePointer={setPagePointer} gameList={gameList} />
				{hoverOnCard ? <GameDescription /> : <></>}
			</div>
		</Animated>
	);
}
