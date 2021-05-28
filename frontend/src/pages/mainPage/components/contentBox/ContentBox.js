import React from 'react';
import LeftBox from './leftBox/LeftBox';
import RightBox from './rightBox/RightBox';
import styles from '../../../../app.module.css';



export default function ContentBox() {

	return (
		<div className={`${styles["content-box"]} ${styles["full-width"]} ${styles["flex-container"]}`}>
			<LeftBox />
			<RightBox />
		</div>
	);
}
