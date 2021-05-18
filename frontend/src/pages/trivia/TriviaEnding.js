import React from 'react';

export default function TriviaEnding(props) {
	const { questions } = props;

	return (
		<div>
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