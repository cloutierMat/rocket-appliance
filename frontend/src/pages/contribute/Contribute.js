import React, { useState, useEffect } from 'react';
import ContributeForm from './components/ContributeForm';
import CreateTrivia from './CreateTrivia';
import EditForm from './components/EditForm';
import styles from '../../app.module.css';


export default function Contribute() {
	const [formToDisplay, setFormToDisplay] = useState();
	const [formPointer, setFormPointer] = useState('Select a game type');
	const [toggleFormPointer, setToggleFormPointer] = useState(false);

	useEffect(() => {
		if (formPointer === 'Trivia') {
			setFormToDisplay(<CreateTrivia setFormPointer={setFormPointer} />);
		}
		else if (formPointer === 'Edit') {
			setFormToDisplay(<EditForm
				setToggleFormPointer={setToggleFormPointer}
				toggleFormPointer={toggleFormPointer}
			/>);
		}
		else {
			setFormToDisplay(<p></p>);
		}
	}, [formPointer, toggleFormPointer]);

	return (
		<div className={`${styles["text-default"]} ${styles["contribute-wrapper"]}`}>
			<p >Select an item in the list below to create a new game</p>
			<ContributeForm setFormPointer={setFormPointer} setToggleFormPointer={setToggleFormPointer} />
			{formToDisplay}
		</div>
	);
}