import React from 'react';

const GameContext = React.createContext({
	list: [],
	setFragmentForFilter: (input) => { },
	filteredByFragment: [],
	filteredByCurrentUser: [],
	filteredByApproved: [],
});

export default GameContext;