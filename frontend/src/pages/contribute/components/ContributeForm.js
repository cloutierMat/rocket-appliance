import React, { useState } from 'react';
import styles from '../../../app.module.css';
import { AiFillEdit } from "react-icons/ai";

export default function ContributeForm(props) {
	const { setFormPointer, setToggleFormPointer, messageOnSubmit } = props;

	const [optionState, setOptionState] = useState('Select a game type');

	function handleGameType(event) {
		if (event.target.value === 'Select a game type') {
			setFormPointer('Select a game type');
		}
		else if (event.target.value === 'Trivia') {
			setFormPointer('Trivia');
		}
		setOptionState('Select a game type');
	}

	function handleToggle() {
		setToggleFormPointer(true);
	}

	return (
		<div className={`${styles["contribute-form"]}`}>
			{/* <Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}> */}
			<select value={optionState} onChange={handleGameType} className={`${styles["text-default"]} ${styles["drop-down"]}`}>
				<option>Select a game type</option>
				<option>Trivia</option>
			</select>
			<hr />
			<div className={`${styles["edit-wrapper"]}`}>
				<h3 className={`${styles["text-default"]}`}>Delete Or edit an existing game!</h3>
				<button onClick={() => { setFormPointer('Edit'); handleToggle(); }}>
					Edit
						<AiFillEdit />
				</button>
				<button onClick={() => { setFormPointer('delete'); handleToggle(); }}>
					Delete
					<AiFillEdit />
				</button>
			</div>
			<h2 className="message-on-create_contribute">{messageOnSubmit}</h2>
			{/* </Animated> */}
		</div>
	);
};
