import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../../../app.module.css";

export default function DeleteForm(props) {
	const { gameList } = props;
	const [messageOnDelete, setMessageOnDelete] = useState(null);
	const [classes, setClasses] = useState(null);

	const { user } = useAuth0();

	async function onDelete(gameName) {
		if (window.confirm(`Are you sure you wish to delete ${gameName}?`)) {
			try {
				const res = await fetch(`/game/trivia/${gameName}/${user.sub}`, {
					method: "DELETE",
				});
				await res.json();
				if (!res.ok) {
					setMessageOnDelete(
						"You are not authorized to delete other contributors games!"
					);
					setClasses(`${styles["message-on-contribute"]} ${styles["alert"]}`);
					return;
				}
				setMessageOnDelete(`Game ${gameName} is successfully deleted!`);
				setClasses(`${styles["message-on-contribute"]} ${styles["success"]}`);
			} catch (error) {
				console.error("error", error);
				setMessageOnDelete("Failed to delete your game!");
				setClasses(`${styles["message-on-contribute"]} ${styles["alert"]}`);
			}
		}
	}

	return (
		<div>
			{messageOnDelete &&
				<div className={classes}>
					{messageOnDelete}
				</div>}
			<p>The highlighted games have not been approved yet.</p>
			<table className={styles["contribute-table"]}>
				<thead className={styles["game-title"]}>
					<tr>
						<th>Check to delete</th>
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
									{`${styles["edit"]} ${game.isApproved ? "" : styles.unapproved}`}
									key={game.name}>
									<td className={styles["button-hover"]}>
										<button onClick={() => onDelete(game.name)}>
											X
											</button>
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
