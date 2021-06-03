import React, { useContext, useState } from "react";
import TriviaForm from './components/TriviaForm';
import SubmitContext from '../../context/SubmitContext';
import { useAuth0 } from "@auth0/auth0-react";

export default function Trivia() {

	const [resetForm, setResetForm] = useState(false);

	const submitCtx = useContext(SubmitContext);

	const { user } = useAuth0();

	async function onSubmit(dataToPost) {
		try {
			const res = await fetch(`/game/trivia/${user.sub}`, {
				method: "POST",
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
			console.log(`New Game ${dataFromServer.name} Created`);
			submitCtx.setMessage(`New Game ${dataFromServer.name} Created`, "success");
			setResetForm(reset => reset ? false : true);
		}
		catch (error) {
			console.error("error", error);
			submitCtx.setMessage(`Fail to create the game! Try again!`, "alert");
		};
	}

	return (
		<>
			<TriviaForm onSubmit={onSubmit} resetForm={resetForm} author={user.name} />
		</>
	);
}