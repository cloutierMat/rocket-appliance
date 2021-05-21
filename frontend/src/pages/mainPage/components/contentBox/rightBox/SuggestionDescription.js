import React from 'react';
import styles from '../../../../../app.module.css';

export default function SuggestionDescription() {
	return <div className={`${styles["text-default"]} ${styles["suggestion-description"]}`}>
		<h2>Not sure where to start?</h2>
		<h4>Here is a random game for you to start your learning!</h4>
	</div>;
}