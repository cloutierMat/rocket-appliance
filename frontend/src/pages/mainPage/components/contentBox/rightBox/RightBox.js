import React from 'react';
import SearchDescription from './SearchDescription';
import SearchInput from './SearchInput';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function RightBox() {

	return (
		<div className={`${styles["right-"]} ${styles["right-side"]}`}>
			<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
				<SearchDescription />
				<SearchInput />
				<SuggestionDescription />
				<SuggestionBox />
			</Animated>
		</div>
	);
}
