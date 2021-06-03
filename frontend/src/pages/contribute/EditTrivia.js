import React, { useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import TriviaForm from './components/TriviaForm';
import SubmitContext from '../../context/SubmitContext';

export default function EditTrivia(props) {


	const { game, setToggleFormPointer } = props;

	const submitCtx = useContext(SubmitContext);
	const { user } = useAuth0();

	async function onSubmit(dataToPost) {
		try {
			const res = await fetch(`/game/trivia/${user.sub}`, {
				method: "PUT",
				body: JSON.stringify(dataToPost),
				headers: {
					"Content-Type": "application/json"
				},
			});
			const dataFromServer = await res.json();
			if (!res.ok) {
				submitCtx.setMessage(dataFromServer.message, "alert");
				return;
			}
			console.log(`The Game ${dataFromServer.name} Modified`);
			submitCtx.setMessage(`The Game ${dataFromServer.name} Modified`, "success");
			setToggleFormPointer(true);
		} catch (error) {
			console.error("error", error);
			submitCtx.setMessage(`Fail to modify the game! Try again!`, "alert");
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} initialData={game} author={game.author} />
		</>
	);
}