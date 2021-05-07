import React from 'react';
import SuggestionGameLogo from "./SuggestionGameLogo";
import SuggestionGameDescription from "./SuggestionGameDescription";
export default function SuggestionsBox() {
	return (
		<div className="suggestion-box">
			<SuggestionGameLogo />
			<SuggestionGameDescription />
		</div>);
}