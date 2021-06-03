import React from "react";
import { Link } from "react-router-dom";
import "./trivia.css";

export default function TriviaEnding(props) {
  const { questions } = props;

  return (
    <div className="trivia-ending">
      <h1>Congratulations, you're done!</h1>
      <h2>In this game, you learned about:</h2>
      <br></br>
      {/* <h2>Click on Learn on the Top of the page to play another game</h2> */}
      <div className="recap-wrapper">
        {questions.map((question) => {
          return (
            <>
              <div>
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={question.question}
                >
                  {question.question}
                </a>
                <div>{question.options[0]}</div>
              </div>
              <br />
            </>
          );
        })}
      </div>
      <br />
      <br />
      <Link to="/">Browse More Games</Link>
    </div>
  );
}
