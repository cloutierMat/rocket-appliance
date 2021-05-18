import React, { useState } from 'react';
import TriviaForm from './contributeForms/TriviaForm'
import FormFilter from './contributeForms/FormFilter'

export default function ContributeForm() {
  const [contributeForm, setContributeForm] = useState("Trivia");
  const 


  function handleContributorSubmit(event) {
    event.preventDefault();
  };

  let formToDisplay = <TriviaForm/>

  function handleGameType(event) {
    setContributeForm(event.target.value)
    console.log(event.target.value)
    // if (event.target.value === "trivia") {
    //   formToDisplay = <TriviaForm/>
    // }
    // else
    //   console.log("no")
    event.target.value === "trivia" ? formToDisplay = <TriviaForm/> : console.log("nothing to display")
  };

  return (
    <div>
      {/* <form onSubmit={handleContributorSubmit}>
        <label for="gameType">What type of game do you want to make? </label>
        <select name="gameType" id="gameType" onChange= { handleGameType }>
          <option value="trivia">Trivia</option>
          <option value="hangman">Hangman</option>
          <option value="hangwoman">Hangwoman</option>
          <option value="placeholder">Placeholder</option>
        </select> <br/>
      </form> */}
    <FormFilter value= { selectedForm } onFormSelect= { handleGameType } />
    </div>
  )

};