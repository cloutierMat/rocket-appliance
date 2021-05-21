import React, { useState } from "react";
import styles from '../app.module.css';
import { Animated } from "react-animated-css";
import learnIcon from "./images/learnicon.png";

export default function NavButton(props) {
	const { name, setPagePointer } = props;

	const [animationDisplay, setAnimationDisplay] = useState(false);

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
						<img src={learnIcon} alt={name} />
					</Animated>
				}
			</button>
		</span>
	);
};