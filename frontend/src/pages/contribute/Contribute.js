import React, { useState, useEffect, useContext } from 'react';
import ContributeForm from './components/ContributeForm';
import CreateTrivia from './CreateTrivia';
import EditForm from './components/EditForm';
import DeleteForm from './components/DeleteForm';
import styles from '../../app.module.css';
import SubmitContext from '../../context/SubmitContext';



export default function Contribute() {
	const [formToDisplay, setFormToDisplay] = useState();
	const [formPointer, setFormPointer] = useState('Select a game type');
	const [toggleFormPointer, setToggleFormPointer] = useState(false);
	const submitCtx = useContext(SubmitContext);

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
		else if (formPointer === 'delete') {
			setFormToDisplay(<DeleteForm
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
			<ContributeForm
				setFormPointer={setFormPointer}
				setToggleFormPointer={setToggleFormPointer}
				messageOnSubmit={submitCtx.messageLog}
			/>
			{formToDisplay}
		</div>
	);
}