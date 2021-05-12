import React, { useEffect } from 'react';

export default function Trivia() {
  useEffect( () => {
    async function fetchData() {
      try {
        const response = await fetch("game/play/trivia/RocketAppliance")
        const triviaToDisplay = await response.json()
        console.log(triviaToDisplay)
      } catch (error) {
        console.error("error", error)
      }
    }
  fetchData()
  },[])
	return (
		<div>

		</div>
	);
}