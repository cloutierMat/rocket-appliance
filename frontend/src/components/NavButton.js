import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../app.module.css';
import { FaBookOpen } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";

export default function NavButton(props) {
	const { name } = props;

	const link = name === "Learn" ? '/' : '/contribute';

	return (
		<span className={styles[name]}>
			<Link to={link}>
				<button
					className={styles["nav-button"]}
				>
					{name}
					{name === "Learn" && <FaBookOpen />}
					{name === "Contribute" && <MdThumbUp />}
				</button>
			</Link>
		</span>
	);
};