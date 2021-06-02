import React from 'react';
import SearchBar from '../../components/SearchBar';
import ContentBox from './components/contentBox/ContentBox';

export default function MainPage(props) {
	const { setPagePointer } = props;
	return (
		<>
			<SearchBar />
			<ContentBox setPagePointer={setPagePointer} />
		</>
	);
}