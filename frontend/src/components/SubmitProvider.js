import React, { useState } from 'react';
import SubmitContext from '../context/SubmitContext';

export default function GameProvider({ children }) {

	const [messageLog, setMessageLog] = useState();
	const setMessage = (message) => {
		setMessageLog(message);
	};

	return (
		<SubmitContext.Provider value={{ messageLog, setMessage }}>
			{children}
		</SubmitContext.Provider>
	);
}
