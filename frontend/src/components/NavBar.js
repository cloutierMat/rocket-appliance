import React from 'react';
import NavButton from './NavButton';
import NavTitle from './NavTitle';
import { Animated } from "react-animated-css";
import styles from '../app.module.css';

export default function NavBar(props) {
	const { setPagePointer } = props;
	return (
		<nav className={`${styles["flex-container"]} ${styles["full-width"]}`}>
			<NavTitle />
			<div className={`${styles["nav-buttons-wrapper"]} ${styles["right-side"]}`}>
				<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
					{['Learn', 'Contribute'].map(element => {
						return <NavButton key={element} name={element} setPagePointer={setPagePointer} />;
					})}
				</Animated>
			</div>
		</nav>
	);
}
