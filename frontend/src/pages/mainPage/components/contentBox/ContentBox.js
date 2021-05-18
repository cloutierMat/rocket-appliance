import React, { useState, useEffect } from 'react';
import LeftBox from './leftBox/LeftBox';
import RightBox from './rightBox/RightBox';

export default function ContentBox(props) {
	const { setPagePointer } = props;
	const [gameList, setGameList] = useState();

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

	return (
		<div className="content-box">
			<LeftBox setPagePointer={setPagePointer} gameList={gameList} />
			<RightBox setPagePointer={setPagePointer} gameList={gameList} />
		</div>
	);
}
