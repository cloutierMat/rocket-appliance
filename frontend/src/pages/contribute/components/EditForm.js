import React, { useEffect, useState } from 'react';
import EditTrivia from './EditTrivia';

export default function EditForm() {
	const [gameList, setGameList] = useState();
	const [displayTrivia, setDisplayTrivia] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/game/list');
			const dataObj = await response.json();
			setGameList(dataObj);
		}
		fetchData();
	}, []);

	function handleClick(gameName) {
		for (const game of gameList) {
			if (game.name === gameName) {
				if (game.type.toLowerCase() === "trivia") {
					setDisplayTrivia(game);
				}
			}
		}
	}

	return (
		<div>
			{displayTrivia
				? <EditTrivia game={displayTrivia} />
				: <table>
					<thead>
						<tr>
							<th>Game name</th>
							<th>Category</th>
							<th>Game type</th>
						</tr>
					</thead>
					<tbody>
						{gameList && gameList.map(game => {
							return (
								<tr key={game.name} onClick={() => handleClick(game.name)}>
									<td>{game.name}</td>
									<td>{game.category}</td>
									<td>{game.type}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			}
		</div>
	);
}