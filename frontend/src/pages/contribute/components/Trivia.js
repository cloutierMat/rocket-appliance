import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v1 as id } from "uuid";
import TriviaForm from './forms/TriviaForm';

export default function Trivia() {
  let INITIAL_DATA = {
    name: "",
    category: "",
    type: "Trivia",
    author: "",
    description: "",
    questions: []
  };
  const [data, setData] = useState(INITIAL_DATA);
  const [messageOnCreate, setMessageOnCreate] = useState("");
  const { watch } = useForm();
  const at = watch("at", 2);

  const handleInsertQuestion = () => {
    let prevData = { ...data };
    prevData.questions = [...data.questions, { id: id(), options: [], link: "" }];
    setData(prevData);
  };


  const handleInsertOption = (questionIndex) => {
    let prevData = { ...data };
    prevData.questions[questionIndex].options = [...data.questions[questionIndex].options, { id: id() }];
    setData(prevData);
  };

  const handleLinkChange = (event, index) => {
    let prevData = { ...data };
    prevData.questions[index].link = event.target.value;
    setData(prevData);
  };

  const handleInfoChange = (event, element) => {
    let prevData = { ...data };
    prevData[element] = event.target.value;
    setData(prevData);
  };


  const handleRemoveQuestion = index => {
    let prevData = { ...data };
    prevData.questions = [...data.questions.slice(0, index), ...data.questions.slice(index + 1)];
    setData(prevData);
  };

  const handleRemoveOption = (optionIndex, questionIndex) => {
    let prevData = { ...data };
    prevData.questions[questionIndex].options = [...data.questions[questionIndex].options.slice(0, optionIndex), ...data.questions[questionIndex].options.slice(optionIndex + 1)];
    setData(prevData);
  };

  function onSubmit(idAsData) {
    const questionsToPost = data.questions.map(question => {
      return {
        link: question.link,
        question: idAsData[question.id],
        options: question.options.map(option => {
          return idAsData[option.id];
        })
      };
    });
    let dataToPost = { ...data, questions: questionsToPost };
    fetch('/game/trivia', {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(dataToPost => {
        console.log(`New Game ${dataToPost.name} Created`);
      })
      .then(setMessageOnCreate(`New Game ${dataToPost.name} Created`))
      .catch((error) => {
        console.error("error", error);
        setMessageOnCreate(`Fail to create the game! Try again!`);
      });
  }

  return (
    <>
      <TriviaForm onSubmit={onSubmit} onChangeInfo={handleInfoChange} onRemoveQuestion={handleRemoveQuestion} onChangeLink={handleLinkChange} onRemoveOption={handleRemoveOption} onInsertOption={handleInsertOption} onInsertQuestion={handleInsertQuestion} data={data} />
      <h2 className="message-on-create_contribute">{messageOnCreate}</h2>
    </>
  );
}