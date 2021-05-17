import React, { useEffect, useState } from 'react';
import Option from "./Option";


export default function Trivia() {
	const [category, setCategory] = useState();
	const [name, setName] = useState();
	const [questions, setQuestions] = useState();
	const [author, setAuthor] = useState();
	const [question, setQuestion] = useState();
	const [options, setOptions] = useState();
	const [link, setLink] = useState();
	const [questionPointer, setQuestionPointer] = useState();
	const [rightAnswer, setRightAnswer] = useState();
	const [isDisabled, setIsDisabled] = useState();
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
				console.log(questions);
				// setQuestion(triviaToDisplay.question);
				// setOptions([...triviaToDisplay.options]);
				// setOptions(options => options.sort(() => Math.random() - 0.5));
				// console.log(triviaToDisplay.options);
				// setRightAnswer(triviaToDisplay.options[0]);
				// setIsDisabled(false);
			} catch (error) {
				console.error("error", error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (rightAnswer === userChoice) {
			console.log("damn right!", userChoice);
			setIsDisabled(true);
		} else {
			console.log("you fool", userChoice);
		}
	}, [userChoice, rightAnswer]);
console.log("questionPointer",questionPointer);
	return (
		<div>
			<h1>{category} </h1>
			<h2>{name}</h2>
			<p>Created by {author}</p>
			<h3>{questions && questions[questionPointer].question}</h3>
			{false && questions[questionPointer].options.map((option) => {
				return <Option setUserChoice={setUserChoice} isDisabled={isDisabled} content={option} key={option} />;
			})}
		</div>
	);
}