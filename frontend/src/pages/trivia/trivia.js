import React, { useEffect, useState } from 'react';
import Option from "./Option";

export default function Trivia() {
  const [category, setCategory] = useState()
  const [name, setName] = useState()
  const [question, setQuestion] = useState()
  const [options, setOptions] = useState()

  useEffect( () => {
    async function fetchData() {
      try {
        const response = await fetch("game/play/trivia/RocketAppliance")
        const triviaToDisplay = await response.json()
        setCategory(triviaToDisplay.category);
        setName(triviaToDisplay.name);
        setQuestion(triviaToDisplay.question);
        setOptions(triviaToDisplay.options);
      } catch (error) {
        console.error("error", error)
      }
    }
  fetchData()
  },[])

	return (
		<div>
      {options && options.map((option) => {
        return <Option content={option}/>
      })}
		</div>
	);
}