import React from 'react';
import GameProvider from './components/GameProvider';
import Main from './pages/mainPage/Main';
import Trivia from './pages/trivia/Trivia';
import Contribute from './pages/contribute/Contribute';
import NavBar from './components/NavBar';
import styles from './app.module.css';
import {
	Switch,
	Route,
} from "react-router-dom";

function App() {
	return (
		<GameProvider>
			<div className={`${styles.App} ${styles["flex-container"]}`}>
				<NavBar />
				<Switch>
					<Route path="/contribute">
						<Contribute />
					</Route>
					<Route path="/trivia/:gameName">
						<Trivia />
					</Route>
					<Route path="/">
						<Main />
					</Route>
				</Switch>
			</div>
		</GameProvider>
	);
}

export default App;
