import React from 'react';
import SearchDescription from './SearchDescription';
import SearchInput from './SearchInput';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';
import { Animated } from "react-animated-css";

export default function RightBox(props) {

	return (
		<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
			<div className="right-box">
				<SearchDescription />
				<SearchInput />
				<SuggestionDescription />
				<SuggestionBox {...props} />
			</div>
		</Animated>
	);
}
