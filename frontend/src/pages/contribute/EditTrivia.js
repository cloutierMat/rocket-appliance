import React, { useContext } from "react";
import TriviaForm from './components/TriviaForm';
import SubmitContext from '../../context/SubmitContext';

export default function EditTrivia(props) {

	const { game, setToggleFormPointer } = props;

	const submitCtx = useContext(SubmitContext);

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
				submitCtx.setMessage(dataFromServer.message);
				return;
			}
			console.log(`The Game ${dataFromServer.name} Modified`);
			submitCtx.setMessage(`The Game ${dataFromServer.name} Modified`);
			setToggleFormPointer(true);
		} catch (error) {
			console.error("error", error);
			submitCtx.setMessage(`Fail to modify the game! Try again!`);
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} initialData={game} />
		</>
	);
}