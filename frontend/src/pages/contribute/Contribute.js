import React, { useState, useEffect } from 'react';
import ContributeForm from './ContributeForm';
import ContributeDescription from './ContributeDescription';
import TriviaForm from './forms/TriviaForm';
import HangmanForm from './forms/HangmanForm';

export default function Contribute(props) {
  const { setPagePointer } = props;
  const [formToDisplay, setFormToDisplay] = useState();
  const [formPointer, setFormPointer] = useState('Select a game type');

  useEffect(() => {
    if (formPointer === 'Trivia') {
      setFormToDisplay(<TriviaForm setFormPointer={setFormPointer} />);
    }
    else if (formPointer === 'Hangman') {
      setFormToDisplay(<HangmanForm setFormPointer={setFormPointer} />);
    }
    else {
      setFormToDisplay(<p></p>);
    }
  }, [formPointer]);

  return (
    <div>
      <ContributeDescription />
      <ContributeForm setFormPointer={setFormPointer} />
      {formToDisplay}
    </div>
  );
}

