import React, { useEffect, useState } from 'react';
import Questions from './Questions';


export default function Trivia() {
	const [category, setCategory] = useState();
	const [name, setName] = useState();
	const [questions, setQuestions] = useState();
	const [author, setAuthor] = useState();
	const [userChoice, setUserChoice] = useState();


	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("game/play/trivia/RocketAppliance");
				const triviaToDisplay = await response.json();
				setCategory(triviaToDisplay.category);
				setName(triviaToDisplay.name);
				setAuthor(triviaToDisplay.author);
				setQuestions(triviaToDisplay.questions);
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
			<Questions questions={questions}/>
		</div>
	);
}