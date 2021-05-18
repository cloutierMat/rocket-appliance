import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import TriviaEnding from './TriviaEnding';

export default function Trivia() {
	const [category, setCategory] = useState();
	const [name, setName] = useState();
	const [questions, setQuestions] = useState();
	const [author, setAuthor] = useState();
	const [isEndReached, setIsEndReached] = useState();

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("game/play/trivia/RocketAppliance");
				const triviaToDisplay = await response.json();
				setCategory(triviaToDisplay.category);
				setName(triviaToDisplay.name);
				setAuthor(triviaToDisplay.author);
				setQuestions(triviaToDisplay.questions);
				setIsEndReached(false);
			} catch (error) {
				console.error("error", error);
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			<h1>{category} </h1>
			<h2>{name}</h2>
			<p>Created by {author}</p>
			{questions && !isEndReached && <Questions questions={questions} setIsEndReached={setIsEndReached} />}
			{questions && isEndReached && <TriviaEnding questions={questions} />}
		</div>
	);
}