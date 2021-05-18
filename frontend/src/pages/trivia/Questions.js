import React, { useEffect, useState } from 'react';
import Option from "./Option";
import UserRighteousness from './UserRighteousness';

export default function Questions(props) {
	const { questions } = props;
	const [question, setQuestion] = useState();
	const [options, setOptions] = useState();
	const [link, setLink] = useState();
	const [rightAnswer, setRightAnswer] = useState();
	const [isDisabled, setIsDisabled] = useState();
	const [questionPointer, setQuestionPointer] = useState();
	const [userRighteousness, setUserRighteousness] = useState("unanswered");

	// When we receive a new trivia, set pointer to 0
	useEffect(() => {
		setQuestionPointer(0);
	}, [questions]);

	// when we modify the pointer, load the new question
	useEffect(() => {
		if (questionPointer === undefined) {
			return;
		}
		setQuestion(questions[questionPointer].question);
		setRightAnswer(questions[questionPointer].options[0]);
		setOptions([...questions[questionPointer].options].sort(() => Math.random() - 0.5));
		setLink(questions[questionPointer].link);
		setIsDisabled(false);
		setUserRighteousness("unanswered");
	}, [questionPointer, questions]);

	// handle answer clicking
	function handleAnswerClick(e) {
		const name = e.target.name;
		if (name === rightAnswer) {
			setUserRighteousness("right");
			setIsDisabled(true);
			setQuestionPointer(pointer => {
				if (pointer < questions.length - 1) {
					return pointer + 1;
				}
			});
		} else {
			setUserRighteousness("wrong");
		}
	}

	return (
		<div>
			<h3>{question && question}</h3>
			{options && options.map((option) => {
				return <Option onClick={handleAnswerClick} isDisabled={isDisabled} content={option} key={option} />;
			})}
			<UserRighteousness userRighteousness={userRighteousness} />
			<h4>To deepen your learning
      <a href={link} target="_blank" rel="noreferrer" >click here</a>
			</h4>
		</div>
	);
}