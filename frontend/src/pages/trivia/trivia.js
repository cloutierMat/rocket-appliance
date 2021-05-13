import React, { useEffect, useState } from 'react';
import Option from "./Option";


export default function Trivia() {
	const [category, setCategory] = useState();
	const [name, setName] = useState();
	const [question, setQuestion] = useState();
	const [options, setOptions] = useState();
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
				setQuestion(triviaToDisplay.question);
				setOptions([...triviaToDisplay.options]);
				setOptions(options => options.sort(() => Math.random() - 0.5));
				console.log(triviaToDisplay.options);
				setRightAnswer(triviaToDisplay.options[0]);
				setIsDisabled(false);
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

	return (
		<div>
			<h1>{category} </h1>
			<h2>{name}</h2>
			<h3>{question}</h3>
			{options && options.map((option) => {
				return <Option setUserChoice={setUserChoice} isDisabled={isDisabled} content={option} key={option} />;
			})}
		</div>
	);
}