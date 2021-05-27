import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../app.module.css';
import { Animated } from "react-animated-css";
import { FaBookOpen } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";

export default function NavButton(props) {
	const { name } = props;

	const [animationDisplay, setAnimationDisplay] = useState(false);

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
					{name === "Learn" && <FaBookOpen />}
					{name === "Contribute" && <MdThumbUp />}
					{animationDisplay &&
						<Animated className={styles["nav-button-icon"]} animationIn="slideInUp" animationOut="slideOutDown">

						</Animated>
					}
				</button>
			</Link>
		</span>
	);
};