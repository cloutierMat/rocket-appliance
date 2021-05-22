import React from 'react';
import SearchDescription from './SearchDescription';
import SearchInput from './SearchInput';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function RightBox(props) {

	return (
		<div className={styles["right-box"]}>
			<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
				<SearchDescription />
				<SearchInput />
				<SuggestionDescription />
				<SuggestionBox {...props} />
			</Animated>
		</div>
	);
}
