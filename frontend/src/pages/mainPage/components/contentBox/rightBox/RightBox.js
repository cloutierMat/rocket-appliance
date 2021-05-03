import React from 'react';
import SearchDescription from './SearchDescription';
import SearchInput from './SearchInput';
import SuggestionDescription from './SuggestionDescription';
import SuggestionBox from './SuggestionBox';

export default function RightBox() {
	return (
		<div>
			<SearchDescription />
			<SearchInput />
			<SuggestionDescription />
			<SuggestionBox />
		</div>
	);
}