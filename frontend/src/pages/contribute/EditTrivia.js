import React, { useState } from "react";
import TriviaFormEdit from './components/TriviaFormEdit';

export default function EditTrivia(props) {
	const { game } = props;

	const [messageOnCreate, setMessageOnCreate] = useState("");

	function onSubmit(dataToPost) {
		console.log("datatopost", dataToPost);
		// fetch('/game/trivia', {
		// 	method: "POST",
		// 	body: JSON.stringify(dataToPost),
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// })
		// 	.then(res => res.json())
		// 	.then(dataToPost => {
		// 		console.log(`New Game ${dataToPost.name} Created`);
		// 	})
		// 	.then(setMessageOnCreate(`New Game ${dataToPost.name} Created`))
		// 	.catch((error) => {
		// 		console.error("error", error);
		// 		setMessageOnCreate(`Fail to create the game! Try again!`);
		// 	});
	}

	return (
		<>
			<TriviaFormEdit onSubmit={onSubmit} initialData={game} />
			<h2 className="message-on-create_contribute">{messageOnCreate}</h2>
		</>
	);
}