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
		if (data.questions.length) {
			questionFocus.current.focus();
		}
	}, [data.questions]);

	useEffect(() => {
		if (data.questions.length)
			optionFocus.current.focus();
	}, [optionsClicked]);

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
				.alphanum()
				.min(3)
				.max(15),
			name: Joi.string()
				.min(3)
				.max(15),
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
							onChange={(event) => { handleInfoChange(event, "category"); }}
							ref={inputFocus} />
					</li>

					<li>
						Game Name: <input
							type="text"
							placeholder="Rocket Trivia"
							onChange={(event) => { handleInfoChange(event, "name"); }} />
					</li>

					<li>
						Contributor: <input
							type="text"
							placeholder="Your name / You can leave it anonymous"
							onChange={(event) => { handleInfoChange(event, "author"); }} />
					</li>

					<li>
						<label className="game-description_contributor">Description:</label>
						<textarea
							cols="50"
							rows="5"
							placeholder="Tell us more about the game"
							onChange={(event) => { handleInfoChange(event, "description"); }} />
					</li>
					{data.questions.map((question, questionIndex) => (
						<li key={question.id} >
							Question {questionIndex + 1}
							<Controller
								render={() => <input ref={questionFocus} />}
								name={question.id}
								control={control}
								defaultValue=""
							/>

							<button onClick={() => { handleRemoveQuestion(questionIndex); }}>Delete</button>
							<ul>

								<li>
									Link: <input
										type="url"
										placeholder="Link to learn more"
										onChange={(event) => { handleLinkChange(event, questionIndex); }} />
								</li>
								{data.questions[questionIndex].options.map((option, optionIndex) => (
									<li key={option.id}>
										Option {optionIndex + 1}
										<Controller
											render={() => <input ref={optionFocus} />}
											name={option.id}
											control={control}
											defaultValue=""
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