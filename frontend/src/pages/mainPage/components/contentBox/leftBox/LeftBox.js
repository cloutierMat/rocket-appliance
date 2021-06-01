import React, { useState } from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';
import styles from '../../../../../app.module.css';
import About from '../../About';

export default function LeftBox() {
	const [gameHovered, setGameHovered] = useState();
	const [hoverOnCard, setHoverOnCard] = useState(false); //temporary false value for hovering over game cards

	function handleHover(name) {
		setHoverOnCard(true);
		setGameHovered(name);
	}

	return (
		<div className={`${styles["left-box"]} ${styles["left-side"]}`}>
			<Gallery onMouseEnter={handleHover} />
			{hoverOnCard ? <GameDescription game={gameHovered} /> : <></>}
			<About></About>
		</div >
	);
}
