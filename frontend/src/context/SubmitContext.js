import React from 'react';

const SubmitContext = React.createContext({
	setMessage: () => { },
	messageLog: ""
});

export default SubmitContext;