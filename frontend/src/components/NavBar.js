import React from 'react';
import NavButton from './NavButton';
import NavTitle from './NavTitle';
import { Animated } from "react-animated-css";
import styles from '../app.module.css';

export default function NavBar(props) {
	const { setPagePointer } = props;
	return (
		<nav>
			<NavTitle />
			<div className={styles["nav-buttons-wrapper"]}>
				<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
					{['Learn', 'Contribute'].map(element => {
						return <NavButton key={element} name={element} setPagePointer={setPagePointer} />;
					})}
				</Animated>
			</div>
		</nav>
	);
}
