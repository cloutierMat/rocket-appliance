import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useContext, useEffect } from 'react';
import GameContext from '../../../context/GameContext';

export default function DeleteForm(props) {
	const [gameList, setGameList] = useState();
	const [messageOnDelete, setMessageOnDelete] = useState(null);

	const gameCtx = useContext(GameContext);
	const { user } = useAuth0();

	useEffect(() => {
		gameCtx.list && setGameList(gameCtx.list);
	}, [gameCtx]);

	async function onDelete(gameName) {
		if (window.confirm(`Are you sure you wish to delete ${gameName}?`)) {
			try {
				const res = await fetch(`/game/trivia/${gameName}/${user.sub}`, {
					method: "DELETE",

				});
				const dataFromServer = await res.json();
				console.log(dataFromServer);
				console.log(`The Game ${gameName} Deleted`);
				setMessageOnDelete(`Game ${gameName} is successfully deleted!`);
			} catch (error) {
				console.error("error", error);
			};
		}
	}
	return (
		<div>
			{messageOnDelete && messageOnDelete}
			<table>
				<thead>
					<tr>
						<th>Check to delete</th>
						<th>Game name</th>
						<th>Category</th>
						<th>Game type</th>
					</tr>
				</thead>
				<tbody>
					{gameList && gameList.map(game => {
						return (<tr key={game.name}>
							<td>
								<button onClick={() => onDelete(game.name)}>X</button>
							</td>
							<td>{game.name} </td>
							<td>{game.category}</td>
							<td>{game.type}</td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}