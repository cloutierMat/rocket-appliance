import React from 'react';

export default function TriviaEnding(props) {
	const { questions } = props;

	return (
		<div>
			<h1>Congratulation!</h1>
			<h2>You've completed the Trivia!</h2>
			<h2>Click on Learn on the Top of the page to play another game</h2>
			{questions.map(question => {
				return (
					<>
						<div>{question.question}</div>
						<div>{question.options[0]}</div>
						<a href={question.link} target="_blank" rel="noreferrer">Learn more!</a>
					</>
				);
			})}
		</div>
	);
}