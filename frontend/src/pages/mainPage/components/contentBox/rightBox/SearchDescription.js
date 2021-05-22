import React from 'react';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function SearchDescription() {
	return (
		<div className={styles["text-default"]}>
			<Animated animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis neque sed lorem luctus aliquet.
			</Animated>
		</div>
	);
}