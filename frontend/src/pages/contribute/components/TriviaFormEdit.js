import React, { useRef, useEffect, useState } from "react";
import { v1 as id } from "uuid";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";

export default function TriviaForm(props) {
	const { initialData, onSubmit } = props;

	const [errorMessages, setErrorMessages] = useState([]);
	const [data, setData] = useState(initialData);
	const [optionsClicked, setOptionsClicked] = useState(true);

	const { handleSubmit, control } = useForm();

	const inputFocus = useRef(null);
	const questionFocus = useRef();
	const optionFocus = useRef();


	const handleInsertQuestion = () => {
		let prevData = { ...data };
		prevData.questions = [...data.questions, { id: id(), options: [], link: "" }];
		setData(prevData);
	};


	const handleInsertOption = (questionIndex) => {
		let prevData = { ...data };
		prevData.questions[questionIndex].options = [...data.questions[questionIndex].options, { id: id() }];
		setData(prevData);
		setOptionsClicked(optionsClicked => optionsClicked ? false : true);
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


	//
	// In the following functions we set the cursor focus
	useEffect(() => {
		inputFocus.current.focus();
	}, []);

	useEffect(() => {
		const dataToEdit = { ...data };
		dataToEdit.questions = dataToEdit.questions.map(question => {
			console.log("link finder", question.link);
			return {
				question: question.question,
				id: id(),
				link: question.link,
				options: question.options.map(option => {
					return {
						option,
						id: id()
					};
				})
			};
		});
		setData(dataToEdit);
	}, []);

	// useEffect(() => {
	// 	if (data.questions.length) {
	// 		questionFocus.current.focus();
	// 	}
	// }, [data.questions]);

	// useEffect(() => {
	// 	if (data.questions.length)
	// 		optionFocus.current.focus();
	// }, [optionsClicked]);

	function formValidator(idAsData) {
		console.log("idAsData", idAsData);
		console.log("data", data);
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
		console.log("dataToPost", dataToPost);
		const schema = Joi.object({
			category: Joi.string()
				.min(3)
				.max(20),
			name: Joi.string()
				.min(3)
				.max(20),
			type: Joi.string(),
			author: Joi.string()
				.empty(""),
			description: Joi.string()
				.max(200),
			questions: Joi.array().items(
				Joi.object({
					question: Joi.string(),
					options: Joi.array().items(
						Joi.string(),
					),
					link: Joi.string(),
				}),
			),
		});
		const { error } = schema.validate(dataToPost);
		if (error) {
			setErrorMessages(error.message);
		} else {
			setErrorMessages(null);
			onSubmit(dataToPost);
		}
	}

	return (
		<>
			{errorMessages && <h3 className="">{errorMessages}</h3>}

			<form onSubmit={handleSubmit(formValidator)}>

				<h1>Trivia </h1>
				<ul>
					<li>
						Category: <input
							type="text"
							placeholder="Rocket Science"
							value={data.category}
							onChange={(event) => { handleInfoChange(event, "category"); }}
							ref={inputFocus} />
					</li>

					<li>
						Game Name: <input
							type="text"
							value={data.name}
							placeholder="Rocket Trivia"
							onChange={(event) => { handleInfoChange(event, "name"); }} />
					</li>

					<li>
						Contributor: <input
							type="text"
							value={data.author}
							placeholder="Your name / You can leave it anonymous"
							onChange={(event) => { handleInfoChange(event, "author"); }} />
					</li>

					<li>
						<label className="game-description_contributor">Description:</label>
						<textarea
							cols="50"
							rows="5"
							value={data.description}
							placeholder="Tell us more about the game"
							onChange={(event) => { handleInfoChange(event, "description"); }} />
					</li>
					{data.questions[0].id && data.questions.map((question, questionIndex) => (
						<li key={question.id} >
							Question {questionIndex + 1}
							<Controller
								render={() => <input ref={questionFocus} defaultValue={question.question} />}
								name={question.id}
								control={control}
								defaultValue={question.question}
							/>

							<button onClick={() => { handleRemoveQuestion(questionIndex); }}>Delete</button>
							<ul>

								<li>
									Link: <input
										type="url"
										placeholder="Link to learn more"
										value={question.link}
										onChange={(event) => { handleLinkChange(event, questionIndex); }} />
								</li>
								{data.questions[questionIndex].options.map((option, optionIndex) => (
									<li key={option.id}>
										Option {optionIndex + 1}
										<Controller
											render={() => <input ref={optionFocus} defaultValue={option.option} />}
											name={option.id}
											control={control}
											defaultValue={option.option}
										/>

										<button onClick={() => { handleRemoveOption(optionIndex, questionIndex); }}>Delete</button>

									</li>
								))}
							</ul>

							<section>
								<button type="button" onClick={() => handleInsertOption(questionIndex)}>New option</button>
							</section>

						</li>
					))
					}
				</ul>
				<section>
					<button type="button" onClick={handleInsertQuestion}>
						New question
        </button>
				</section>

				<input type="submit" />
			</form>
		</>
	);
}