import React, { useEffect, useState } from 'react';
import Option from "./Option";

export default function Questions(props) {
  const {questions} = props;
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();
  const [link, setLink] = useState();
  const [questionPointer, setQuestionPointer] = useState();
  const [rightAnswer, setRightAnswer] = useState();
  const [isDisabled, setIsDisabled] = useState();
  
  useEffect(() => {
    if (questionPointer === undefined) {
      return;
    }
    setQuestion(questions[questionPointer].question);
    setRightAnswer(questions[questionPointer].options[0]);
    setOptions([...questions[questionPointer].options].sort(() => Math.random() - 0.5));
    setLink(questions[questionPointer].link);
    setIsDisabled(false);
  }, [questionPointer]);
  
  function handleClick(e) {
    const name = e.target.name;
    if (name === rightAnswer) {
      console.log("awesome");
      setIsDisabled(true);
      setQuestionPointer(pointer => {
        if (pointer < questions.length - 1) {
          return pointer + 1;
        }
      });
    } else {
      console.log("not");
    }
  }

  return (
    <div>
      <h3>{question && question}</h3>
      {options && options.map((option) => {
        return <Option onClick={handleClick} isDisabled={isDisabled} content={option} key={option} />;
      })}
      <h4>To deepen your learning
      <a href={link} target="_blank" rel="noreferrer" >click here</a>
    </h4>
  </div>
  )
}