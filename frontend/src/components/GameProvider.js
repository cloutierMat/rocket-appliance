import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import GameContext from '../context/GameContext';

export default function GameProvider({ children }) {

	const [list, setList] = useState([]);
	const [filteredByFragment, setFilterByFragment] = useState([]);
	const [filteredByCurrentUser, setFilterByCurrentUser] = useState([]);
	const [fragmentForFilter, setFragmentForFilter] = useState("");

	const { user, isAuthenticated } = useAuth0();

	//
	// listening to changes in list and fragment
	// change the filtered list accordingly
	useEffect(() => {
		const filteredList = list.filter(game => {
			const filterElements = [
				game.name.toLowerCase(),
				game.category.toLowerCase(),
				game.author.toLowerCase(),
				game.type.toLowerCase()
			];
			return filterElements.filter(element => element.includes(fragmentForFilter.toLowerCase())).length;
		});
		setFilterByFragment(filteredList);
	}, [fragmentForFilter, list]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/game/list');
			const dataObj = await response.json();
			setList([...dataObj]);
		}
		fetchData();
	}, []);

	//
	// listen to changes in user and in list
	// keeps an updated list of current user created games
	useEffect(() => {
		if (isAuthenticated) {
			setFilterByCurrentUser(list.filter(game => game.author === user.nickname));
		}
	}, [list, user]);

	return (
		<GameContext.Provider value={{
			list,
			filteredByFragment,
			setFragmentForFilter,
			filteredByCurrentUser
		}}>
			{children}
		</GameContext.Provider>
	);
}
