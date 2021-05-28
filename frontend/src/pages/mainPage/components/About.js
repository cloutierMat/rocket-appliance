import React from 'react';
import { Animated } from "react-animated-css";
import styles from '../../../app.module.css';

export default function About() {
	return (

		<div className={`${styles["text-default"]} ${styles["full-width"]} ${styles["about"]}`}>
			{/* <Animated animationIn="slideInRight" animationOut="fadeOut" isVisible={true}> */}
			rocket appliance is a contribution based educatonal game platform designed to expose people to 
			traditionally 'ominous' knowledge in a palatable, gamified format. 
		{/* </Animated> */}
		</div>
	);
};