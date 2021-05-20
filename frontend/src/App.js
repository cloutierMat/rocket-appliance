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
      switch (pagePointer) {
         case 'Main':
         case 'Learn': 
            setPageToDisplay(<Main setPagePointer={setPagePointer} />);
            break;
         case 'Contribute':
            setPageToDisplay(<Contribute setPagePointer={setPagePointer} />);
            break;
         default:
            setPageToDisplay(<Trivia gameName={pagePointer}/>);
      }
      // if (pagePointer === 'Main') {
      //    setPageToDisplay(<Main setPagePointer={setPagePointer} />);
      // } 
      // else if (pagePointer==='Contribute') {
      // }
      // else {
      // }
   }, [pagePointer]);

   return (
      <div className="App">
         <NavBar setPagePointer={setPagePointer}/>
         {pageToDisplay}
      </div>
   );
}

export default App;
