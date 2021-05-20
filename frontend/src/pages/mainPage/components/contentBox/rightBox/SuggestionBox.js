import React from 'react';
import SuggestionGameLogo from "./SuggestionGameLogo";
import GameCard from '../leftBox/GameCard'
import SuggestionGameDescription from "./SuggestionGameDescription";
export default function SuggestionsBox() {
	return (
		<div className="suggestion-box">
			{/* <GameCard /> */}
			<SuggestionGameDescription />
		</div>);
}