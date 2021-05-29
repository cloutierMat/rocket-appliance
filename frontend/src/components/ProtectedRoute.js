import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component }, ...rest) {

	const { isAuthenticated, loginWithPopup } = useAuth0();

	const [isResponseReceived, setIsReponseReveived] = useState(isAuthenticated);

	//
	// we try to login to auth0 only if we haven't received an answer yet
	useEffect(() => {
		const authenticatedUser = async () => {
			try {
				await loginWithPopup();
				setIsReponseReveived(true);
			} catch (error) {
				console.log(error);
				setIsReponseReveived(true);
			}
		};
		if (!isResponseReceived) {
			authenticatedUser();
		}
	}, [isResponseReceived, loginWithPopup]);


	return (
		<>
			{!isResponseReceived && <h3>Loading...</h3>}
			{isResponseReceived &&
				<Route
					{...rest}
					render={props => {
						if (isAuthenticated) {
							return <Component {...props} />;
						} else {
							return <Redirect to="/" />;
						}
					}}
				/>
			}
		</>
	);
}
