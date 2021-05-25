import React, { useState } from "react";
import TriviaFormEdit from './components/TriviaFormEdit';

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

	function onSubmit(dataToPost) {
		fetch('/game/trivia', {
			method: "POST",
			body: JSON.stringify(dataToPost),
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(res => res.json())
			.then(dataToPost => {
				console.log(`New Game ${dataToPost.name} Created`);
			})
			.then(setMessageOnCreate(`New Game ${dataToPost.name} Created`))
			.catch((error) => {
				console.error("error", error);
				setMessageOnCreate(`Fail to create the game! Try again!`);
			});
	}

	return (
		<>
			<TriviaFormEdit onSubmit={onSubmit} initialData={initialData} />
			<h2 className="message-on-create_contribute">{messageOnCreate}</h2>
		</>
	);
}