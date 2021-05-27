import React, { useContext, useState } from "react";
import TriviaForm from './components/TriviaForm';
import SubmitContext from '../../context/SubmitContext';

export default function Trivia() {

	const [resetForm, setResetForm] = useState(false);

	const submitCtx = useContext(SubmitContext);

	async function onSubmit(dataToPost) {
		try {
			const res = await fetch('/game/trivia', {
				method: "POST",
				body: JSON.stringify(dataToPost),
				headers: {
					"Content-Type": "application/json"
				},
			});
			const dataFromServer = await res.json();
			if (!res.ok) {
				submitCtx.setMessage(dataFromServer.message);
				return;
			}
			console.log(`New Game ${dataFromServer.name} Created`);
			submitCtx.setMessage(`New Game ${dataFromServer.name} Created`);
			setResetForm(reset => reset ? false : true);
		}
		catch (error) {
			console.error("error", error);
			submitCtx.setMessage(`Fail to create the game! Try again!`);
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} resetForm={resetForm} />
		</>
	);
}