import React from 'react';
import SearchDescription from './SearchDescription';
import SearchInput from './SearchInput';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function RightBox() {

	return (
		<div className={`${styles["right-box"]} ${styles["right-side"]}`}>
			<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
				<SearchDescription />
				<SearchInput />
				<hr></hr>
				<SuggestionDescription />
				<SuggestionBox />
			</Animated>
		</div>
	);
}
