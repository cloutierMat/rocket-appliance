import React, { useState, useEffect, useContext } from "react";
import EditTrivia from "../EditTrivia";
import SubmitContext from '../../../context/SubmitContext';
import styles from "../../../app.module.css";

export default function EditForm(props) {
	const { toggleFormPointer, setToggleFormPointer, gameList } = props;
	const [displayTrivia, setDisplayTrivia] = useState(false);
	const submitCtx = useContext(SubmitContext);

	useEffect(() => {
		toggleFormPointer && setDisplayTrivia(false);
	}, [toggleFormPointer]);

	function handleClick(gameName) {
		submitCtx.setMessage("", "");
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
		<div className={styles["contribute-edit"]}>
			{displayTrivia ? (
				<EditTrivia
					game={displayTrivia}
					setToggleFormPointer={setToggleFormPointer}
				/>
			) : (
				<>
					<p>The highlighted games have not been approved yet.</p>
					<table className={styles["contribute-table"]}>
						<thead>
							<tr>
								<th>Game name</th>
								<th>Category</th>
								<th>Game type</th>
							</tr>
						</thead>
						<tbody>
							{gameList &&
								gameList.map((game) => {
									return (
										<tr
											className=
											{game.isApproved ? "" : styles.unapproved}
											key={game.name} onClick={() => handleClick(game.name)}>
											<td>{game.name} </td>
											<td>{game.category}</td>
											<td>{game.type}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
}
