import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ContributeFormWithHooks() {
  const [ questions, setQuestions ] = useState([])
  const {register, handleSubmit} = useForm()
  
  function onSubmit(data) {
    console.log(data)
    console.log(questions)
    setQuestions((questions) => [...questions, data.questions.question]) 
  }


  return (
    <div>
      
      <form>
        <select>
          <option value="trivia"> Select a game type</option>
          <option value="trivia" {...register("type", {required: true})}>Trivia</option>
          <option value="trivia" {...register("type", {required: true})}>Hangman</option>
        </select>
      </form>
      
      <form>Name your game: <br/><input defaultValue= "name" {...register("name", {required: true})}/></form>
      <form>Subject: <br/><input defaultValue= "category" {...register("category", {required: true})}/></form>
      <form>Author: <br/><input defaultValue= "anonymous" {...register("author")}/></form>
      <form>Game Description: <br/><input defaultValue= "description" {...register("description", {required: true})}/></form>
  
      <form onSubmit= {handleSubmit(onSubmit)}>
        Enter a question: <br/><input defaultValue= "questions" {...register("questions.question", {minLength:2})}/>
        <button> Submit Question </button>
      </form>

      <form>
        Possible answers: <br/>
        Correct Answer: <input defaultValue= "option" {...register("questions.option.0")}/><br/> 
        Incorrect Answer: <input defaultValue= "option" {...register("questions.option.1")}/><br/> 
        Incorrect Answer: <input defaultValue= "option" {...register("questions.option.2")}/><br/>  
        Incorrect Answer: <input defaultValue= "option" {...register("questions.option.3")}/><br/>  
      </form>
      
      <div>
        {questions.map(ques => <div>Questions: {ques}</div>)}
      </div>

    </div>
  )

};

