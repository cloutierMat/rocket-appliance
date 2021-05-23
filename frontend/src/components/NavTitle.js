import React from 'react';
import navBanner from './images/dubResBannerV1.png';
import { Animated } from "react-animated-css";
import styles from '../app.module.css';

export default function NavTitle() {
	return (
		<section className={`${styles["nav-title"]} ${styles["left-side"]}`}>
			<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
				<img className={styles["nav-banner"]} src={navBanner} alt="RocketAppliance" />
			</Animated>
		</section>
	);
}
