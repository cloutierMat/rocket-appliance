import React, { useState } from "react";
import TriviaForm from './components/TriviaForm';

export default function EditTrivia(props) {
	const { game } = props;

	const [messageOnUpdate, setMessageOnUpdate] = useState("");

	async function onSubmit(dataToPost) {
		try {
			const res = await fetch('/game/trivia', {
				method: "PUT",
				body: JSON.stringify(dataToPost),
				headers: {
					"Content-Type": "application/json"
				},
			});
			const dataFromServer = await res.json();
			if (!res.ok) {
				setMessageOnUpdate(dataFromServer.message);
				return;
			}
			console.log(`The Game ${dataFromServer.name} Modified`);
			setMessageOnUpdate(`The Game ${dataFromServer.name} Modified`);
		} catch (error) {
			console.error("error", error);
			setMessageOnUpdate(`Fail to modify the game! Try again!`);
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} initialData={game} />
			<h2 className="message-on-create_contribute">{messageOnUpdate}</h2>
		</>
	);
}