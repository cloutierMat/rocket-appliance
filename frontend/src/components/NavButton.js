import React, { useState } from "react";
import styles from '../app.module.css';
import { Animated } from "react-animated-css";
import learnIcon from "./images/learnicon.png";
import contributeIcon from "./images/contributeicon.png";

export default function NavButton(props) {
	const { name, setPagePointer } = props;

	const [animationDisplay, setAnimationDisplay] = useState(false);
	const [icons, setIcons] = useState({
		Learn: learnIcon,
		Contribute: contributeIcon
	});

	return (
		<span className={styles[name]}>
			<button
				className={styles["nav-button"]}
				onClick={() => { setPagePointer(name); }}
				onMouseEnter={() => setAnimationDisplay(true)}
				onMouseLeave={() => setAnimationDisplay(false)}
			>
				{name}
				{animationDisplay &&
					<Animated className={styles["nav-button-icon"]} animationIn="slideInUp" animationOut="slideOutDown">
						<img src={icons[name]} alt={name} />
					</Animated>
				}
			</button>
		</span>
	);
};