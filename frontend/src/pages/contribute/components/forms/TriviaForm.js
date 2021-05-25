import React, { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";

export default function TriviaForm(props) {
	const { onSubmit, onChangeInfo, onRemoveQuestion, onChangeLink, onRemoveOption, onInsertOption, onInsertQuestion, data } = props;

	const [errorMessages, setErrorMessages] = useState([]);

	const { handleSubmit, control } = useForm();

	const inputFocus = useRef(null);

	useEffect(() => {
		inputFocus.current.focus();
	}, []);

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
						Category: <input type="text" placeholder="Rocket Science" onChange={(event) => { onChangeInfo(event, "category"); }} ref={inputFocus} />
					</li>

					<li>
						Game Name: <input type="text" placeholder="Rocket Trivia" onChange={(event) => { onChangeInfo(event, "name"); }} />
					</li>

					<li>
						Contributor: <input type="text" placeholder="Your name / You can leave it anonymous" onChange={(event) => { onChangeInfo(event, "author"); }} />
					</li>

					<li>
						<label className="game-description_contributor">Description:</label>
						<textarea cols="50" rows="5" placeholder="Tell me more about the game" onChange={(event) => { onChangeInfo(event, "description"); }} />
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

							<button onClick={() => { onRemoveQuestion(questionIndex); }}>Delete</button>
							<ul>

								<li>
									Link: <input type="url" placeholder="Link to learn more" onChange={(event) => { onChangeLink(event, questionIndex); }} />
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

										<button onClick={() => { onRemoveOption(optionIndex, questionIndex); }}>Delete</button>

									</li>
								))}
							</ul>

							<section>
								<button type="button" onClick={() => onInsertOption(questionIndex)}>
									New option
       					</button>
							</section>

						</li>
					))}
				</ul>
				<section>
					<button type="button" onClick={onInsertQuestion}>
						New question
        </button>
				</section>

				<input type="submit" />
			</form>
		</>
	);
}