import React from 'react';

export default function Option(props) {
	const { content, onClick, optionsClicked, rightAnswer } = props;

	const isDisabled = optionsClicked.includes(content);
	const extraClass = isDisabled
		? rightAnswer === content
			? " correct"
			: " incorrect"
		: "";

	return (
		<button className={"trivia-option" + extraClass} onClick={onClick} disabled={isDisabled} name={content}>
			{content}
		</button>
	);
}