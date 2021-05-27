import React, { useState, useContext, useEffect } from 'react';
import GameContext from '../../../context/GameContext';
import EditTrivia from '../EditTrivia';

export default function EditForm(props) {
	const { toggleFormPointer, setToggleFormPointer } = props;
	const [gameList, setGameList] = useState();
	const [displayTrivia, setDisplayTrivia] = useState(false);

	const gameCtx = useContext(GameContext);

	useEffect(() => {
		gameCtx.list && setGameList(gameCtx.list);
	}, [gameCtx]);

	useEffect(() => {
		toggleFormPointer && setDisplayTrivia(false);
	}, [toggleFormPointer]);

	function handleClick(gameName) {
		for (const game of gameList) {
			if (game.name === gameName) {
				if (game.type.toLowerCase() === "trivia") {
					setDisplayTrivia(game);
					setToggleFormPointer(false);
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
							return (<tr key={game.name} onClick={() => handleClick(game.name)}>
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