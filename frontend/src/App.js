import React from "react";
// import Main from './pages/mainPage/Main';
import Trivia from './pages/trivia/trivia';
import NavBar from './components/NavBar';
import './app.css';

function App() {
	function thePageToDisplay() {
		// return <Main />;
		return <Trivia />;
	}
	return (
		<div className="App">
			<NavBar />
			{thePageToDisplay()}
		</div>
	);
}

export default App;
