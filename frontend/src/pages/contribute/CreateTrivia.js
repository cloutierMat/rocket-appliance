import React, { useContext } from "react";
import TriviaForm from './components/TriviaForm';
import SubmitContext from '../../context/SubmitContext';

export default function Trivia() {
	let initialData = {
		name: "",
		category: "",
		type: "Trivia",
		author: "",
		description: "",
		questions: [{
			link: "",
			question: "",
			options: [""]
		}]
	};

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

		}
		catch (error) {
			console.error("error", error);
			submitCtx.setMessage(`Fail to create the game! Try again!`);
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} initialData={initialData} />
		</>
	);
}