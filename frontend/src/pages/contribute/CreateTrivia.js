import React, { useState } from "react";
import TriviaForm from './components/TriviaForm';

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
	const [messageOnCreate, setMessageOnCreate] = useState("");

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
				setMessageOnCreate(dataFromServer.message);
				return;
			}
			console.log(`New Game ${dataFromServer.name} Created`);
			setMessageOnCreate(`New Game ${dataFromServer.name} Created`);
		}
		catch (error) {
			console.error("error", error);
			setMessageOnCreate(`Fail to create the game! Try again!`);
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} initialData={initialData} />
			<h2 className="message-on-create_contribute">{messageOnCreate}</h2>
		</>
	);
}