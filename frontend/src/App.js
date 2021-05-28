import React from 'react';
import GameProvider from './components/GameProvider';
import SubmitProvider from './components/SubmitProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './pages/mainPage/Main';
import Trivia from './pages/trivia/Trivia';
import Contribute from './pages/contribute/Contribute';
import NavBar from './components/NavBar';
import styles from './app.module.css';
import {
	Switch,
	Route,
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
	const { logout } = useAuth0();
	return (
		<GameProvider>
			<SubmitProvider>
				<div className={`${styles.App} ${styles["flex-container"]}`}>
					<NavBar />
					<button onClick={() => logout()}>logout</button>
					<Switch>
						<ProtectedRoute path="/contribute" component={Contribute} />
						<Route path="/trivia/:gameName">
							<Trivia />
						</Route>
						<Route path="/">
							<Main />
						</Route>
					</Switch>
				</div>
			</SubmitProvider>
		</GameProvider>
	);
}

export default App;
