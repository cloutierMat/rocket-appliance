import React, { useRef, useEffect, useState } from "react";
import { v1 as id } from "uuid";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";

export default function TriviaForm(props) {
	const { initialData, onSubmit } = props;

	const [errorMessages, setErrorMessages] = useState([]);
	const [data, setData] = useState(initialData);
	const [focusedRef, setFocusedRef] = useState('input');

	const { handleSubmit, control } = useForm();

	const inputFocus = useRef(null);
	const questionFocus = useRef();
	const optionFocus = useRef();

	const handleInsertQuestion = () => {
		let prevData = { ...data };
		prevData.questions = [...data.questions, { id: id(), options: [], link: "", question: "" }];
		setData(prevData);
		setFocusedRef("question");
	};

	const handleInsertOption = (questionIndex) => {
		let prevData = { ...data };
		prevData.questions[questionIndex].options = [...data.questions[questionIndex].options, { id: id(), option: "" }];
		setData(prevData);
		setFocusedRef("option");
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

	const handleKeyOnQuestion = (e, questionIndex) => {
		if (handlePreventEnterDefault(e)) {
			handleInsertOption(questionIndex);
		}
	};

	const handlePreventEnterDefault = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			return true;
		}
	};

	useEffect(() => {
		const dataToEdit = { ...data };
		delete dataToEdit.__v;
		dataToEdit.questions = dataToEdit.questions.map(question => {
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

	//
	// In the following functions we set the cursor focus
	useEffect(() => {
		switch (focusedRef) {
			case "input":
				inputFocus.current.focus();
				setFocusedRef(null);
				break;
			case "question":
				questionFocus.current.focus();
				setFocusedRef(null);
				break;
			case "option":
				optionFocus.current.focus();
				setFocusedRef(null);
				break;
			default:
				break;
		}
	}, [focusedRef]);

	//
	// Validationg data and setting back to parent
	function formValidator(idAsData) {
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
				.min(30)
				.max(200),
			questions: Joi.array().items(
				Joi.object({
					question: Joi.string()
						.min(3),
					options: Joi.array().items(
						Joi.string()
							.min(3)
							.required(),
					),
					link: Joi.string(),
				}).required(),
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

			<form onSubmit={handleSubmit(formValidator)} >

				<h1>Trivia </h1>
				<ul>
					<li>
						Category: <input
							type="text"
							placeholder="Rocket Science"
							value={data.category}
							onChange={(event) => { handleInfoChange(event, "category"); }}
							ref={inputFocus}
							onKeyPress={handlePreventEnterDefault}
						/>
					</li>

					<li>
						Game Name: <input
							type="text"
							value={data.name}
							placeholder="Rocket Trivia"
							onChange={(event) => { handleInfoChange(event, "name"); }}
							onKeyPress={handlePreventEnterDefault}
						/>
					</li>

					<li>
						Contributor: <input
							type="text"
							value={data.author}
							placeholder="Your name / You can leave it anonymous"
							onChange={(event) => { handleInfoChange(event, "author"); }}
							onKeyPress={handlePreventEnterDefault}
						/>
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
					{data.questions[0] && data.questions[0].id && data.questions.map((question, questionIndex) => (
						<li key={question.id} >
							Question {questionIndex + 1}
							<Controller
								name={question.id}
								control={control}
								defaultValue={question.question}
								render={({ field }) => <input  {...field}
									ref={questionFocus}
									onKeyPress={(e) => handleKeyOnQuestion(e, questionIndex)}
								/>}
							/>

							<button onClick={() => { handleRemoveQuestion(questionIndex); }}>Delete</button>
							<ul>

								<li>
									Link: <input
										type="url"
										placeholder="Link to learn more"
										value={question.link}
										onChange={(event) => { handleLinkChange(event, questionIndex); }}
										onKeyPress={handlePreventEnterDefault}
									/>
								</li>
								{data.questions[questionIndex].options.map((option, optionIndex) => (
									<li key={option.id}>
										Option {optionIndex + 1}
										<Controller
											name={option.id}
											control={control}
											defaultValue={option.option}
											render={({ field }) => <input {...field}
												ref={optionFocus}
												onKeyPress={(e) => handleKeyOnQuestion(e, questionIndex)}
											/>}
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