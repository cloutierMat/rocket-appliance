import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Answers from './forms/Answers';

export default function ContributeFormWithHooks() {
	const [questions, setQuestions] = useState([]);
	const [answerAmount, setAnswerAmount] = useState([2]);
	const [forceRerender, setForceRerender] = useState([1]);
	const { register, handleSubmit, unregister } = useForm();

	function handleDeleteAnswer(index, answer) {
		let prev = answerAmount;
		prev[index] = prev[index] - 1;
		setAnswerAmount(prev);
		setForceRerender(force => ++force);
		// unregister(answer);
	}

	function handleExtraAnswer(index) {
		let prev = answerAmount;
		prev[index] = prev[index] + 1;
		setAnswerAmount(prev);
		setForceRerender(force => ++force);
	}

	function handleExtraQuestion() {
		let prev = answerAmount;
		prev.push(2);
		setAnswerAmount(prev);
		setForceRerender(force => ++force);
	}


	const makeArray = (iteration) => {
		const arr = [];
		for (let i = 0; i < iteration; i++) {
			arr.push(i);
		}
		return arr;
	};

	return (
		<div>

			<form>
				<select>
					<option value="trivia"> Select a game type</option>
					<option value="trivia" {...register("type", { required: true })}>Trivia</option>
					<option value="trivia" {...register("type", { required: true })}>Hangman</option>
				</select>
			</form>

			<form>Name your game: <br /><input defaultValue="name" {...register("name", { required: true })} /></form>
			<form>Subject: <br /><input defaultValue="category" {...register("category", { required: true })} /></form>
			<form>Author: <br /><input defaultValue="anonymous" {...register("author")} /></form>
			<form>Game Description: <br /><input defaultValue="description" {...register("description", { required: true })} /></form>

			{forceRerender && makeArray(answerAmount.length).map(question => {
				return (
					<>
						<form>
							Enter a question: <br /><input defaultValue="questions" {...register(`questions[${question}].question`, { minLength: 2 })} />
						</form>

						<form>
							Put the right answer as the first choice. <br />
							{
								makeArray(answerAmount[question]).map(index => (
									<div>
										Answer: <input defaultValue="option" {...register(`questions[${question}].option[${index}]`)} key="index" />
										<button onClick={() => handleDeleteAnswer(question, `questions[${question}].option[${index}]`)}>Delete</button>
										<br />
									</div>
								))
							}
						</form>
						<button onClick={() => handleExtraAnswer(question)} >Add option</button>
					</>
				);
			})}
			<br />
			<button onClick={handleExtraQuestion}>Add question</button>
			<div>
				{questions.map(ques => <div>Questions: {ques}</div>)}
			</div>

		</div>
	);

};

