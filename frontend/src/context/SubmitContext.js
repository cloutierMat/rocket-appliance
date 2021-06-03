import React from 'react';

const SubmitContext = React.createContext({
	setMessage: (message, className) => { },
	messageLog: "",
	className: ""
});

export default SubmitContext;