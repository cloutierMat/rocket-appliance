import React from 'react';

const GameContext = React.createContext({
	list: [],
	setFragmentForFilter: (input) => { },
	filteredByFragment: []
});

export default GameContext;