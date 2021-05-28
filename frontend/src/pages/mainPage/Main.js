import React from 'react';
import ContentBox from './components/contentBox/ContentBox';

export default function MainPage(props) {
	const { setPagePointer } = props;
	return (
		<>
			<ContentBox setPagePointer={setPagePointer} />
		</>
	);
}