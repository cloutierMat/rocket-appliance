import React, { useContext, useState } from 'react';
import GameContext from '../../../../../context/GameContext';
import styles from '../../../../../app.module.css';

export default function SearchInput() {
	const [filteredData, setFilteredData] = useState([]);
	const [searchVal, setSearchVal] = useState();

	const gameCtx = useContext(GameContext);
	const list = gameCtx.list;

	function handleSearch(event) {
		const fragment = event.target.value.toLowerCase();
		gameCtx.setFragmentForFilter(fragment);
		setSearchVal(event.target.value.length);
		const filteredList = list.filter(item => { return item.name.toLowerCase().includes(event.target.value.toLowerCase()); });
		setFilteredData(filteredList);
	}

	let content = <></>;
	if (filteredData && searchVal) {
		content = filteredData.map(game => {
			return (<div style={{ color: 'white' }} key={game.name}>{game.name}</div>);
		});
	}

	return (
		<>
			<div className={styles["search-box-wrapper"]}>
				<input type="search" autoComplete="off" placeholder="Search input" name="q" onChange={(event) => handleSearch(event)} className={styles["search-box"]} />
			</div>
			<div>
				{content}
			</div>
		</>
	);
};