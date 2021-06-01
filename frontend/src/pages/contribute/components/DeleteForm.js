import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import styles from "../../../app.module.css";

export default function DeleteForm(props) {
  const { gameList } = props;
  const [messageOnDelete, setMessageOnDelete] = useState(null);
  const { user } = useAuth0();

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
      }
    }
  }

  return (
    <div>
      {messageOnDelete && messageOnDelete}
      <table>
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
                <tr className={styles["edit"]} key={game.name}>
                  <div className={styles["button-hover"]}>
                    <button onClick={() => onDelete(game.name)}>X</button>
                  </div>
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
