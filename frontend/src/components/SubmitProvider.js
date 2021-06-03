import React, { useState } from 'react';
import SubmitContext from '../context/SubmitContext';

export default function GameProvider({ children }) {

	const [messageLog, setMessageLog] = useState();
	const [className, setClassName] = useState();

	function setMessage(message, className) {
		setMessageLog(message);
		setClassName(className);
	}

	return (
		<SubmitContext.Provider value={{ messageLog, setMessage, className }}>
			{children}
		</SubmitContext.Provider>
	);
}
