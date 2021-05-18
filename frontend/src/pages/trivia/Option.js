import React from 'react';

export default function Option(props) {
	const { content, onClick, optionsClicked, rightAnswer } = props;
	return (
		<button className="trivia-option" onClick={onClick} disabled={optionsClicked.includes(content)} name={content}>
			{content}
		</button>
	);
}