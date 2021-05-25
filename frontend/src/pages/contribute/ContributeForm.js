import React from 'react';

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
		<div>
			<select onChange={handleGameType}>
				<option>Select a game type</option>
				<option>Trivia</option>
				<option>Hangman</option>
			</select>
			<h3>Or edit an existing game!</h3>
			<button onClick={() => setFormPointer("Edit")}>Edit</button>
		</div>
	);


};
