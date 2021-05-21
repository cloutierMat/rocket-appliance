import React, { useState, useEffect } from 'react';
import LeftBox from './leftBox/LeftBox';
import RightBox from './rightBox/RightBox';
import styles from '../../../../app.module.css';

export default function ContentBox(props) {
	const { setPagePointer } = props;
	const [gameList, setGameList] = useState();
	const [hoverOnCard, setHoverOnCard] = useState(false); //temporary false value for hovering over game cards
	const [gameHovered, setGameHovered] = useState();


	//
	// fetching game cards form server
	// it is only running on first load. therefore a refresh is needed for a contributor to see his new game
	// 
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/game/list');
			const dataObj = await response.json();
			setGameList(dataObj);
		}
		fetchData();
	}, []);

	function handleHover(name) {
		setHoverOnCard(true);
		setGameHovered(gameList.find(game => game.name === name));
	}

	return (
		<div className={styles["content-box"]}>
			<LeftBox hoverOnCard={hoverOnCard} gameHovered={gameHovered} onMouseEnter={handleHover} setPagePointer={setPagePointer} gameList={gameList} />
			<RightBox setPagePointer={setPagePointer} gameList={gameList} />
		</div>
	);
}
