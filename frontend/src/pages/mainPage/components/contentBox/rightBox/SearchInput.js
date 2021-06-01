import React, { useContext, useState } from 'react';
import GameContext from '../../../../../context/GameContext';
import styles from '../../../../../app.module.css';

export default function SearchInput() {
	const gameCtx = useContext(GameContext);

	function handleSearch(event) {
		const fragment = event.target.value.toLowerCase();
		gameCtx.setFragmentForFilter(fragment);
	}

	return (
		<div className={styles["search-box-wrapper"]}>
			<input type="search" autoComplete="off" placeholder="Search input" name="q" onChange={handleSearch} className={styles["search-box"]} />
		</div>
	);
};