import React, { useState } from 'react';

export default function ContributeForm() {
  const [contributeForm, setContributeForm] = useState();

  function handleContributorSubmit(event) {
    event.preventDefault();
  }
  function handleGameName() {

  }

  return (
    <div>
      <form onSubmit={handleContributorSubmit}>

        <label for="category">Which category your game is most related to </label>
        <select name="category" id="category">
          <option value="science">Science</option>
          <option value="language">Language</option>
          <option value="history">History</option>
          <option value="trivia">Trivia</option>
        </select><br />

        <label for="gameName">Game </label>
        <input type="text" id="gameName" name="gameName" onChange={handleGameName}></input><br />

        <label for="contributor">Contributor / Author </label>
        <input type="text" id="contributor" name="contributor" ></input><br />

        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}