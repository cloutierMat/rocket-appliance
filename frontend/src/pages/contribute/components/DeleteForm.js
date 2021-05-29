import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useContext, useEffect } from 'react';
import GameContext from '../../../context/GameContext';

export default function DeleteForm(props) {
  const gameCtx = useContext(GameContext);
  const [gameList, setGameList] = useState(gameCtx.list);
  const [messageOnDelete, setMessageOnDelete] = useState(null);
  const { user } = useAuth0();

  const allGames =
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
    </table>;

  const [gameTable, setGameTable] = useState(allGames);


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
        gameList.forEach(element => {
          if (element.name === gameName) { gameList.pop(element); }
        });
        const newTable =
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
          </table>;
        setGameTable(newTable);
      } catch (error) {
        console.error("error", error);
      };
    }
  }

  useEffect(() => {
    gameCtx.list && setGameList(gameCtx.list);
  }, [gameCtx]);

  return (
    <div>
      {messageOnDelete && messageOnDelete}
      {gameTable && gameTable}

    </div>
  );
}