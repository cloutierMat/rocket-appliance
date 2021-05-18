import React, { useState } from 'react';

export default function TriviaForm(props) {
  const { setFormPointer } = props;
  const [questionToDisplay, setQuestionToDisplay] = useState([]);

  const questions = [];
  const previousQuestions = [];
  function handleAddQuestion() {
    const question = {};
    const options = {};
    question.question = document.getElementById("question").value;
    options.answer1 = document.getElementById("answer1").value;
    options.answer2 = document.getElementById("answer2").value;
    options.answer3 = document.getElementById("answer3").value;
    options.answer4 = document.getElementById("answer4").value;
    questions.push({ question, options });
    
    previousQuestions.push({ question, options });
    for (let i = 0; i < previousQuestions.length; i++) {
      setQuestionToDisplay(Object.values(Object.values(previousQuestions)[i].question));
      console.log(Object.values(Object.values(previousQuestions)[i].question));
      console.log(previousQuestions);
    }
  }

  //deconstructs questions array to display the questions only -> doesn't display on page but works in console
  function handleQuestionsDisplay() {
    // console.log(questions)
    // for (let i = 0; i < questions.length; i++)
    // console.log((Object.values(Object.values(questions)[i].question)))
  }

  return (
    <form>
      Title: <input type="text" />
      Category: <input type="text" />
      Author: <input type="text" />
      <div>
        Question: <input type="text" id="question" />
        Correct Answer: <input type="text" id="answer1" />
        Answer: <input type="text" id="answer2" />
        Answer: <input type="text" id="answer3" />
        Answer: <input type="text" id="answer4" />
        <input type="button" value="Add Question" onClick={handleAddQuestion} />
        <div>{questionToDisplay}</div>
      </div>
      <input type="button" onClick={handleQuestionsDisplay} value="Show Questions" />
    </form>
  )
}
