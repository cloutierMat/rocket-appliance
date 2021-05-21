import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v1 as id } from "uuid";

export default function TriviaFormTake3() {
	let INITIAL_DATA = {
		name: "",
		category: "",
		type: "Trivia",
		author: "",
		description: "",
		questions: []
	};
	const [data, setData] = useState(INITIAL_DATA);
	const [messageOnCreate, setMessageOnCreate] = useState("");
	const { watch, handleSubmit, control } = useForm();
	const at = watch("at", 2);

	const handleInsertQuestion = () => {
		let prevData = { ...data };
		prevData.questions = [...data.questions, { id: id(), options: [], link: "" }];
		setData(prevData);
	};


	const handleInsertOption = (questionIndex) => {
		let prevData = { ...data };
		prevData.questions[questionIndex].options = [...data.questions[questionIndex].options, { id: id() }];
		setData(prevData);
	};

	const handleLinkChange = (event, index) => {
		let prevData = { ...data };
		prevData.questions[index].link = event.target.value;
		setData(prevData);
	};

	const handleInfoChange = (event, element) => {
		let prevData = { ...data };
		prevData[element] = event.target.value;
		setData(prevData);
	};


	const handleRemoveQuestion = index => {
		let prevData = { ...data };
		prevData.questions = [...data.questions.slice(0, index), ...data.questions.slice(index + 1)];
		setData(prevData);
	};

	const handleRemoveOption = (optionIndex, questionIndex) => {
		let prevData = { ...data };
		prevData.questions[questionIndex].options = [...data.questions[questionIndex].options.slice(0, optionIndex), ...data.questions[questionIndex].options.slice(optionIndex + 1)];
		setData(prevData);
	};

	function onSubmit(idAsData) {
		console.log(idAsData);
		const questionsToPost = data.questions.map(question => {
			return {
				link: question.link,
				question: idAsData[question.id],
				options: question.options.map(option => {
					return idAsData[option.id];
				})
			};
		});
		let dataToPost = { ...data, questions: questionsToPost };
		console.log(dataToPost);
		fetch('/game/trivia', {
			method: "POST",
			body: JSON.stringify(dataToPost),
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(res => res.json())
			.then(dataToPost => {
				console.log(`New Game ${dataToPost.name} Created`);
			})
			.then(setMessageOnCreate(`New Game ${dataToPost.name} Created`))
			.catch((error) => {
				console.error("error", error);
				setMessageOnCreate(`Fail to create the game! Try again!`);
			});
	}
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>

				<h1>Trivia </h1>
				<ul>
					<li>
						Category: <input type="text" placeholder="Rocket Science" onChange={(event) => { handleInfoChange(event, "category"); }} />
					</li>
					<li>
						Game Name: <input type="text" placeholder="Rocket Trivia" onChange={(event) => { handleInfoChange(event, "name"); }} />
					</li>
					<li>
						Contributor: <input type="text" placeholder="Your name / You can leave it anonymous" onChange={(event) => { handleInfoChange(event, "author"); }} />
					</li>
					<li>
						<label className="game-description_contributor">Description:</label>
						<textarea cols="50" rows="5" placeholder="Tell me more about the game" onChange={(event) => { handleInfoChange(event, "description"); }} />
					</li>
					{data.questions.map((question, questionIndex) => (
						<li key={question.id}>
							Question {questionIndex + 1}
							<Controller
								as={<input />}
								name={question.id}
								control={control}
								defaultValue=""
							/>
							<button onClick={() => handleRemoveQuestion(questionIndex)}>Delete</button>
							<ul>
								<li>
									Link: <input type="url" placeholder="Link to learn more" onChange={(event) => { handleLinkChange(event, questionIndex); }} />
								</li>
								{data.questions[questionIndex].options.map((option, optionIndex) => (
									<li key={option.id}>
										Option {optionIndex + 1}
										<Controller
											as={<input />}
											name={option.id}
											control={control}
											defaultValue=""
										/>
										<button onClick={() => handleRemoveOption(optionIndex, questionIndex)}>Delete</button>

									</li>
								))}
							</ul>
							<section>
								<button type="button" onClick={() => handleInsertOption(questionIndex)}>
									New option
        </button>
							</section>
						</li>
					))}
				</ul>
				<section>
					<button type="button" onClick={handleInsertQuestion}>
						New question
        </button>
				</section>

				<input type="submit" />
			</form>
			<h3>{messageOnCreate}</h3>
		</>
	);
}