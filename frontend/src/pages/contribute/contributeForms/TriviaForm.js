import React, { useState } from 'react';

export default function TriviaForm() {
  return (
    <div>
      <form>
        <label for="category">Which category your game is most related to </label>
        <select name="category" id="category">
          <option value="science">Science</option>
          <option value="language">Language</option>
          <option value="history">History</option>
          <option value="math">Math</option>
        </select><br />

        <label for="gameName">Game </label>
        <input type="text" id="gameName" name="gameName"></input><br />

        <label for="contributor">Contributor / Author </label>
        <input type="text" id="contributor" name="contributor" ></input><br />

        <button type="submit">Create Game</button>
      </form>
    </div>
  )
};