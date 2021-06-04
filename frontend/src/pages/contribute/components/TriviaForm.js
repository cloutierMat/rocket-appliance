import React, { useRef, useEffect, useState } from "react";
import { v1 as id } from "uuid";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import styles from "../../../app.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const INITIAL_DATA = {
	name: "",
	category: "",
	type: "Trivia",
	description: "",
	isApproved: false,
	questions: [
		{
			link: "",
			question: "",
			options: [""],
		},
	],
};

export default function TriviaForm(props) {
	const { initialData, onSubmit, resetForm, author } = props;
	const { user } = useAuth0();

	const [errorMessages, setErrorMessages] = useState();
	const [data, setData] = useState({ ...INITIAL_DATA });
	const [focusedRef, setFocusedRef] = useState("input");
	const [immutableGameName, setImmutableGameName] = useState();


	const { handleSubmit, control } = useForm();

	const inputFocus = useRef(null);
	const questionFocus = useRef();
	const optionFocus = useRef();

	const handleInsertQuestion = () => {
		let prevData = { ...data };
		prevData.questions = [
			...data.questions,
			{ id: id(), options: [], link: "", question: "" },
		];
		setData(prevData);
		setFocusedRef("question");
	};

	const handleInsertOption = (questionIndex) => {
		let prevData = { ...data };
		prevData.questions[questionIndex].options = [
			...data.questions[questionIndex].options,
			{ id: id(), option: "" },
		];
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

	const handleRemoveQuestion = (index) => {
		let prevData = { ...data };
		prevData.questions = [
			...data.questions.slice(0, index),
			...data.questions.slice(index + 1),
		];
		setData(prevData);
	};

	const handleRemoveOption = (optionIndex, questionIndex) => {
		let prevData = { ...data };
		prevData.questions[questionIndex].options = [
			...data.questions[questionIndex].options.slice(0, optionIndex),
			...data.questions[questionIndex].options.slice(optionIndex + 1),
		];
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

	function handleApproval() {
		const newApproval = !data.isApproved;
		setData(data => { return { ...data, isApproved: newApproval }; });
	}

	useEffect(() => {
		setData({ ...INITIAL_DATA });
	}, [resetForm]);

	useEffect(() => {
		const dataToEdit = initialData
			? { ...initialData, author }
			: { ...INITIAL_DATA, author };
		dataToEdit.questions = dataToEdit.questions.map((question) => {
			return {
				question: question.question,
				id: id(),
				link: question.link,
				options: question.options.map((option) => {
					return {
						option,
						id: id(),
					};
				}),
			};
		});
		if (dataToEdit.name) setImmutableGameName(true);
		setData({ ...dataToEdit, isApproved: false });
	}, [initialData, author]);

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
		const questionsToPost = data.questions.map((question) => {
			return {
				link: question.link,
				question: idAsData[question.id],
				options: question.options.map((option) => {
					return idAsData[option.id];
				}),
			};
		});
		let dataToPost = { ...data, questions: questionsToPost };

		const schema = Joi.object({
			category: Joi.string().min(3).max(20),
			name: Joi.string().min(3).max(20),
			type: Joi.string(),
			author: Joi.string().empty(""),
			description: Joi.string().min(30).max(200),
			isApproved: Joi.boolean(),
			questions: Joi.array().items(
				Joi.object({
					question: Joi.string().min(3),
					options: Joi.array().items(Joi.string().min(1).required()),
					link: Joi.string(),
				}).required()
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
		<div>
			{errorMessages && <h3 className={`${styles["alert"]} ${styles["message-on-contribute"]}`}>{errorMessages}</h3>}
			<ul className={styles["game-rules"]}>
				<li>Please keep the content PG and respectful.</li>
				<li>Orient your questions towards learning not tricking.</li>
				<li>Provide meaningful links to a learning resource not a direct answer.</li>
				<li>3 to 10 questions is best.</li>
			</ul>
			<form
				className={`${styles["title-form"]}`}
				onSubmit={handleSubmit(formValidator)}
			>
				<h1>Trivia </h1>
				<div
					className={`${styles["flex-container"]} ${styles["flex-space-around"]} ${styles["edit-wrapper"]}`}
				>

					<label className={styles.switch} >
						<input type="checkbox" onChange={handleApproval} checked={data.isApproved} />
						<div className={styles.slider} hidden={!user["http://localhost:3000/roles"].includes("admin")} >Approval Status</div>
					</label>

					<div className={styles["full-width"]}>
						<div>
							Category: <br></br>
							<input
								type="text"
								placeholder="Rocket Science"
								value={data.category}
								onChange={(event) => {
									handleInfoChange(event, "category");
								}}
								ref={inputFocus}
								onKeyPress={handlePreventEnterDefault}
							/>
						</div>

						<div>
							Game Name: <br></br>
							<input
								type="text"
								value={data.name}
								placeholder="Rocket Trivia"
								disabled={immutableGameName}
								onChange={(event) => {
									handleInfoChange(event, "name");
								}}
								onKeyPress={handlePreventEnterDefault}
							/>
						</div>

						<div>
							Contributor: <br></br>
							<input
								type="text"
								defaultValue={data.author}
								disabled={true}
							// onKeyPress={handlePreventEnterDefault}
							/>
						</div>

						<div>
							<label className="game-description_contributor">
								Description:
              </label>
							<br></br>
							<textarea
								rows="5"
								value={data.description}
								placeholder="Tell us more about the game"
								onChange={(event) => {
									handleInfoChange(event, "description");
								}}
							/>
						</div>
					</div>
					{data.questions[0] &&
						data.questions[0].id &&
						data.questions.map((question, questionIndex) => (
							<div className={styles["question"]} key={question.id}>
								Question {questionIndex + 1}
								<Controller
									name={question.id}
									control={control}
									defaultValue={question.question}
									render={({ field }) => (
										<input
											{...field}
											ref={questionFocus}
											onKeyPress={(e) => handleKeyOnQuestion(e, questionIndex)}
										/>
									)}
								/>
								<button
									onClick={() => {
										handleRemoveQuestion(questionIndex);
									}}
								>
									Delete
                </button>
								<p className={styles["option-description"]}>
									{" "}
                  The correct answer should be option 1
                </p>
								<div>
									{data.questions[questionIndex].options.map(
										(option, optionIndex) => (
											<div className={styles["option"]} key={option.id}>
												Option {optionIndex + 1}
												<Controller
													name={option.id}
													control={control}
													defaultValue={option.option}
													render={({ field }) => (
														<input
															{...field}
															ref={optionFocus}
															onKeyPress={(e) =>
																handleKeyOnQuestion(e, questionIndex)
															}
														/>
													)}
												/>
												<button
													onClick={() => {
														handleRemoveOption(optionIndex, questionIndex);
													}}
												>
													Delete
                        </button>
											</div>
										)
									)}
								</div>
								<section className={styles["option-button"]}>
									<button
										type="button"
										onClick={() => handleInsertOption(questionIndex)}
									>
										New option
                  </button>
								</section>
								<div className={styles["link"]}>
									Link:
                  <input
										type="url"
										placeholder="Link to learn more"
										value={question.link}
										onChange={(event) => {
											handleLinkChange(event, questionIndex);
										}}
										onKeyPress={handlePreventEnterDefault}
									/>
								</div>
							</div>
						))}
				</div>
				<section className={styles["new-question"]}>
					<button type="button" onClick={handleInsertQuestion}>
						New question
          </button>
				</section>
				<input className={styles["submit"]} type="submit" />
			</form>
			<br />
		</div>
	);
}
