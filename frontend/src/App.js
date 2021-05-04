import React from "react";
import Main from './pages/mainPage/Main';
import NavBar from './NavBar';
import './app.css';
function App() {
	function thePageToDisplay() {
		return <Main />;
	}
	return (
		<div className="App">
			<NavBar />
			{thePageToDisplay()}
		</div>
	);
}

export default App;
