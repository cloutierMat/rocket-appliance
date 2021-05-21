import React, { useState, useEffect } from 'react';
import ContributeForm from './ContributeForm';
import ContributeDescription from './ContributeDescription';
import HangmanForm from './components/forms/HangmanForm';
import Trivia from './components/Trivia';

export default function Contribute(props) {
	const { setPagePointer } = props;
	const [formToDisplay, setFormToDisplay] = useState();
	const [formPointer, setFormPointer] = useState('Select a game type');

	useEffect(() => {
		if (formPointer === 'Trivia') {
			setFormToDisplay(<Trivia setFormPointer={setFormPointer} />);
		}
		else if (formPointer === 'Hangman') {
			setFormToDisplay(<HangmanForm setFormPointer={setFormPointer} />);
		}
		else {
			setFormToDisplay(<p></p>);
		}
	}, [formPointer]);

	return (
		<div>
			<ContributeDescription />
			<ContributeForm setFormPointer={setFormPointer} />
			{formToDisplay}
		</div>

	);
}

