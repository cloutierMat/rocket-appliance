import React, { useState, useEffect } from 'react';
import GameContext from '../context/GameContext';

export default function GameProvider({ children }) {

	const [list, setList] = useState();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/game/list');
			const dataObj = await response.json();
			setList(dataObj);
		}
		fetchData();
	}, []);

	return (
		<GameContext.Provider value={{ list }}>
			{children}
		</GameContext.Provider>
	);
}
