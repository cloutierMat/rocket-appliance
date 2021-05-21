import React, { useState } from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function LeftBox(props) {
	const { setPagePointer, gameList, onMouseEnter, hoverOnCard, gameHovered } = props;


	return (
		<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
			<div className={styles["left-box"]}>
				<Gallery onMouseEnter={onMouseEnter} setPagePointer={setPagePointer} gameList={gameList} />
				{hoverOnCard ? <GameDescription game={gameHovered} /> : <></>}
			</div>
		</Animated>
	);
}
