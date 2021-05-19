import React, { useState, useEffect } from 'react';
import Main from './pages/mainPage/Main';
import Trivia from './pages/trivia/Trivia';
import Contribute from './pages/contribute/Contribute'
import NavBar from './components/NavBar';
import './app.css';

function App() {
	const [pageToDisplay, setPageToDisplay] = useState();
	const [pagePointer, setPagePointer] = useState('Main');

   useEffect(() => {
      if (pagePointer === 'Main') {
         setPageToDisplay(<Main setPagePointer={setPagePointer} />);
      } 
      else if (pagePointer==='Contribute') {
         setPageToDisplay(<Contribute setPagePointer={setPagePointer} />);
      }
      else {
         setPageToDisplay(<Trivia />);
      }
   }, [pagePointer]);

   return (
      <div className="App">
         <NavBar setPagePointer={setPagePointer}/>
         {pageToDisplay}
      </div>
   );
}

export default App;
