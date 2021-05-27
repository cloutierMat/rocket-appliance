import React from 'react';
import styles from '../../../app.module.css';
import { AiFillEdit } from "react-icons/ai";



export default function ContributeForm(props) {
	const { setFormPointer } = props;

	function handleGameType(event) {
		if (event.target.value === 'Select a game type') {
			setFormPointer('Select a game type');
		}
		else if (event.target.value === 'Trivia') {
			setFormPointer('Trivia');
		}
		else if (event.target.value === 'Hangman') {
			setFormPointer('Hangman');
		}
	}


	return (
		<div className={`${styles["contribute-form"]}`}>
			<select onChange={handleGameType} className={`${styles["text-default"]} ${styles["drop-down"]}`}>
				<option>Select a game type</option>
				<option>Trivia</option>
				<option>Hangman</option>
			</select>
		<hr/>
			<div className={`${styles["edit-wrapper"]}`}>
				<h3 className={`${styles["text-default"]}`}>Or edit an existing game!</h3>
				<button onClick={() => setFormPointer("Edit")}>Edit
					<AiFillEdit/>
				</button>
			</div> 
		</div>
	);


};
