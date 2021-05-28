import React, { useState, useEffect } from 'react';
import GameContext from '../context/GameContext';
import lodash from 'lodash';

export default function GameProvider({ children }) {

	const [list, setList] = useState();
	const [filteredByFragment, setFilterByFragment] = useState([]);

	const setFragmentForFilter = (fragment) => {
		const filteredList = list.filter(game => {
			return game.name.toLowerCase().includes(fragment);
		});
		setFilterByFragment(list);
	};

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/game/list');
			const dataObj = await response.json();
			setList(dataObj);
		}
		fetchData();
	}, []);

	return (
		<GameContext.Provider value={{
			list,
			filteredByFragment,
			setFragmentForFilter
		}}>
			{children}
		</GameContext.Provider>
	);
}
