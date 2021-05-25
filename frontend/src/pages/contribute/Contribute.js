import React, { useState, useEffect } from 'react';
import ContributeForm from './ContributeForm';
import HangmanForm from './components/forms/HangmanForm';
import CreateTrivia from './components/CreateTrivia';
import EditForm from './components/EditForm';

export default function Contribute() {
	const [formToDisplay, setFormToDisplay] = useState();
	const [formPointer, setFormPointer] = useState('Select a game type');

	useEffect(() => {
		if (formPointer === 'Trivia') {
			setFormToDisplay(<CreateTrivia setFormPointer={setFormPointer} />);
		}
		else if (formPointer === 'Hangman') {
			setFormToDisplay(<HangmanForm setFormPointer={setFormPointer} />);
		}
		else if (formPointer === 'Edit') {
			setFormToDisplay(<EditForm setFormPointer={setFormPointer} />);
		}
		else {
			setFormToDisplay(<p></p>);
		}
	}, [formPointer]);

	return (
		<div>
			<p>Select an item in the list below to create a new game.</p>
			<ContributeForm setFormPointer={setFormPointer} />
			{formToDisplay}
		</div>
	);
}

