import React, { useState, useContext } from "react";
import styles from "../../../app.module.css";
import { AiFillEdit } from "react-icons/ai";
import SubmitContext from "../../../context/SubmitContext";

export default function ContributeForm(props) {
	const { setFormPointer, setToggleFormPointer } = props;

	const [optionState, setOptionState] = useState("Select a game type");

	const SubmitCtx = useContext(SubmitContext);

	function handleGameType(event) {
		if (event.target.value === "Select a game type") {
			setFormPointer("Select a game type");
		} else if (event.target.value === "Trivia") {
			setFormPointer("Trivia");
		}
		setOptionState("Select a game type");
	}

	function handleToggle() {
		setToggleFormPointer(true);
	}

	return (
		<div className={`${styles["contribute-form"]}`}>
			<select
				value={optionState}
				onChange={handleGameType}
				className={`${styles["text-default"]} ${styles["drop-down"]}`}
			>
				<option>Select a game type</option>
				<option>Trivia</option>
			</select>
			<hr />
			<div className={`${styles["edit-wrapper"]}`}>
				<h3 className={`${styles["text-default"]}`}>
					Edit or Delete an exisiting game!
        </h3>
				<button
					onClick={() => {
						setFormPointer("Edit");
						handleToggle();
					}}
				>
					Edit
          <AiFillEdit />
				</button>
				<button
					onClick={() => {
						setFormPointer("delete");
						handleToggle();
					}}
				>
					Delete
          <AiFillEdit />
				</button>
			</div>
			{SubmitCtx.messageLog && <h2 className={`${styles["message-on-contribute"]} ${styles[SubmitCtx.className]}`}>
				{SubmitCtx.messageLog}
			</h2>}
		</div>
	);
}
