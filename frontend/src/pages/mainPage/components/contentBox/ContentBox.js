import React from 'react';
import LeftBox from "./leftBox/LeftBox";
import RightBox from './rightBox/RightBox';

export default function ContentBox() {
	return (
		<div>
			<LeftBox />
			<RightBox />
		</div>
	);
}