import React from 'react';
import { Link } from 'react-router-dom';

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
						{/* <div>{question.question}</div> */}
						<a href={question.link} target="_blank" rel="noreferrer">{question.question}</a>
						<div>{question.options[0]}</div>
						<br />
					</>
				);
			})}
			<br />
			<br />
			<Link to='/'>Browse More Games</Link>
		</div>
	);
}