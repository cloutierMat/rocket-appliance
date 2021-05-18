import React from 'react';

export default function FormFilter(props) {
  const { handleGameType, value } = props
  function handleSelectedType(event) {
    handleGameType(event.target.value)
  }
  return (
    <div>
      <form>
        <label for="gameType">What type of game do you want to make? </label>
        <select value= { value } name="gameType" id="gameType" onChange= { handleSelectedType }>
          <option value="trivia">Trivia</option>
          <option value="hangman">Hangman</option>
          <option value="hangwoman">Hangwoman</option>
          <option value="placeholder">Placeholder</option>
        </select> <br/>
      </form>
    </div>
  )
};