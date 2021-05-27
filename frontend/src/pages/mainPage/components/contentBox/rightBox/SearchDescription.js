import React from 'react';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function SearchDescription() {
	return (
		<div className={styles["text-default"]}>
			<Animated animationOut="fadeOut" isVisible={true}>
				Enter queries to filter available games
			</Animated>
		</div>
	);
}