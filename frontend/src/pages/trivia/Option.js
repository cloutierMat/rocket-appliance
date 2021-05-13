import React from 'react';

export default function Option(props) {
	const { content, setUserChoice, isDisabled } = props;
	return (
		<button className="trivia-option" onClick={() => setUserChoice(content)} disabled={isDisabled}>
			{content}
		</button>
	);
}