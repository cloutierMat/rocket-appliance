import React, { useState, useEffect } from 'react';
import Main from './pages/mainPage/Main';
import Trivia from './pages/trivia/trivia';
import NavBar from './components/NavBar';
import './app.css';

function App() {
   const [pageToDisplay, setPageToDisplay] = useState();
   const [pagePointer, setPagePointer] = useState('Main');

   useEffect(() => {
      if (pagePointer === 'Main') {
         setPageToDisplay(<Main pagePointer={setPagePointer} />);
      } else {
         setPageToDisplay(<Trivia />);
      }
   }, [pagePointer]);

   return (
      <div className="App">
         <NavBar />
         {pageToDisplay}
      </div>
   );
}

export default App;
