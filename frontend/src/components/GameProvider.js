import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import GameContext from '../context/GameContext';

export default function GameProvider({ children }) {

	const [clientPointer, setClientPointer] = useState();
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

	function fetchData() {
	}

	//
	// fetch data from the server
	useEffect(() => {
		fetchData();
		const interval = setInterval(() => {
			fetch(`/game/list/${clientPointer}`)
				.then(res => {
					if (res.status === 204) {
						return false;
					}
					return res.json();
				})
				.then(dataObj => {
					if (!dataObj) {
						return;
					}
					setList([...dataObj.list]);
					const newPointer = dataObj.pointer;
					setClientPointer(newPointer);
				}).catch(error => console.log(error));
		}, 2500);
		return () => clearInterval(interval);
	}, [clientPointer, list]);

	//
	// listen to changes in user and in list
	// keeps an updated list of current user created games
	useEffect(() => {
		if (isAuthenticated) {
			if (user["http://localhost:3000/roles"].includes("admin")) {
				setFilterByCurrentUser(list);
				return;
			}
			setFilterByCurrentUser(list.filter(game => game.author === user.nickname));
		}
	}, [list, user, isAuthenticated]);

	return (
		<GameContext.Provider value={{
			list,
			filteredByFragment,
			setFragmentForFilter,
			filteredByCurrentUser,
		}}>
			{children}
		</GameContext.Provider>
	);
}
