import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../app.module.css';
import { Animated } from "react-animated-css";
import learnIcon from "./images/learnicon.png";
import contributeIcon from "./images/contributeicon.png";

export default function NavButton(props) {
	const { name } = props;

	const [animationDisplay, setAnimationDisplay] = useState(false);
	const [icons, setIcons] = useState({
		Learn: learnIcon,
		Contribute: contributeIcon
	});
	const link = name === "Learn" ? '/' : '/contribute';
	return (
		<span className={styles[name]}>
			<Link to={link}>
				<button
					className={styles["nav-button"]}
					onMouseEnter={() => setAnimationDisplay(true)}
					onMouseLeave={() => setAnimationDisplay(false)}
				>
					{name}
					{/* <img src={icons[name]} alt={name} /> */}
					{animationDisplay &&
						<Animated className={styles["nav-button-icon"]} animationIn="slideInUp" animationOut="slideOutDown">

						</Animated>
					}
				</button>
			</Link>
		</span>
	);
};