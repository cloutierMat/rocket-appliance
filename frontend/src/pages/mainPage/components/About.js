import React from 'react';
import styles from '../../../app.module.css';

export default function About() {
	return (

		<div className={`${styles["text-default"]} ${styles["full-width"]} ${styles["about"]}`}>
			rocket appliance is a contribution based educational game platform designed to expose people to
			traditionally 'ominous' knowledge in a palatable, gamified format.
		</div>
	);
};