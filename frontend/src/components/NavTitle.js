import React from 'react';
import { Link } from 'react-router-dom';
import navBanner from './images/RA-V4.svg';
import { Animated } from "react-animated-css";
import styles from '../app.module.css';

export default function NavTitle() {
	return (
		<div className={`${styles["nav-wrapper"]}`}>
			<Link to="/">
				<section className={`${styles["nav-title"]} ${styles["left-side"]}`}>
					<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
						<img className={styles["nav-banner"]} src={navBanner} alt="RocketAppliance" />
					</Animated>
				</section>
			</Link>
		</div>
	);
}
