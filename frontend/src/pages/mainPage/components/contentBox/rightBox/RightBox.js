import React from 'react';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';
import styles from '../../../../../app.module.css';

export default function RightBox() {

	return (
		<div className={`${styles["right-box"]} ${styles["right-side"]}`}>
			<SuggestionDescription />
			<SuggestionBox />
		</div>
	);
}
