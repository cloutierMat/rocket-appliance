import React from 'react';
import styles from '../../../../../app.module.css';

export default function SearchInput() {
	return (
		<div className={styles["search-box-wrapper"]}>
			<input type="search" placeholder="Search input" name="q" className={styles["search-box"]}></input>
		</div>
	);
}
