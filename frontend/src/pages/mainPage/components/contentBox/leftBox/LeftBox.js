import React, { useState } from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';
import styles from '../../../../../app.module.css';

export default function LeftBox(props) {
	const { setPagePointer, gameList, onMouseEnter, hoverOnCard, gameHovered } = props;


	return (
		<div className={`${styles["left-box"]} ${styles["left-side"]}`}>
			<Gallery onMouseEnter={onMouseEnter} setPagePointer={setPagePointer} gameList={gameList} />
			{hoverOnCard ? <GameDescription game={gameHovered} /> : <></>}
		</div >
	);
}
