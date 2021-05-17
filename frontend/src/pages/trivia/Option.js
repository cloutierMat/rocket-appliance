import React from 'react';

export default function Option(props) {
	const { content, onClick, isDisabled } = props;
	return (
		<button className="trivia-option" onClick={onClick} disabled={isDisabled} name={content}>
			{content}
		</button>
	);
}