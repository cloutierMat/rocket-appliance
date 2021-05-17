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
				setQuestionPointer(0);
				// setQuestion(triviaToDisplay.question);
				// setOptions([...triviaToDisplay.options]);
				// setOptions(options => options.sort(() => Math.random() - 0.5));
				// console.log(triviaToDisplay.options);
				// setRightAnswer(triviaToDisplay.options[0]);
			} catch (error) {
				console.error("error", error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (questionPointer === undefined) {
			return;
		}
		setQuestion(questions[questionPointer].question);
		setRightAnswer(questions[questionPointer].options[0]);
		setOptions([...questions[questionPointer].options].sort(() => Math.random() - 0.5));
		setLink(questions[questionPointer].link);
		setIsDisabled(false);
	}, [questionPointer]);

	function handleClick(e) {
		const name = e.target.name;
		if (name === rightAnswer) {
			console.log("awesome");
			setIsDisabled(true);
			setQuestionPointer(pointer => {
				if (pointer < questions.length - 1) {
					return pointer + 1;
				}
			});
		} else {
			console.log("not");
		}
	}

	return (
		<div>
			<h1>{category} </h1>
			<h2>{name}</h2>
			<p>Created by {author}</p>
			<h3>{question && question}</h3>
			{options && options.map((option) => {
				return <Option onClick={handleClick} isDisabled={isDisabled} content={option} key={option} />;
			})}
			<h4>To deepen your learning
				<a href={link} target="_blank" rel="noreferrer" >click here</a>
			</h4>
		</div>
	);
}