import React from 'react';
import SearchDescription from './SearchDescription';
import SearchInput from './SearchInput';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';
import { Animated } from "react-animated-css";
import styles from '../../../../../app.module.css';

export default function RightBox(props) {

	return (
		<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
			<div className={styles["right-box"]}>
				<SearchDescription />
				<SearchInput />
				<SuggestionDescription />
				<SuggestionBox {...props} />
			</div>
		</Animated>
	);
}
