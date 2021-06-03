import React from "react";
import NavButton from "./NavButton";
import NavTitle from "./NavTitle";
import { Animated } from "react-animated-css";
import styles from "../app.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { RiLogoutBoxRFill } from "react-icons/ri";

export default function NavBar() {
	const { logout, isAuthenticated } = useAuth0();
	return (
		<nav className={`${styles["flex-container"]} ${styles["full-width"]}`}>
			<NavTitle />
			<div
				className={`${styles["nav-buttons-wrapper"]} ${styles["right-side"]}`}
			>
				<Animated
					animationIn="slideInRight"
					animationOut="fadeOut"
					isVisible={true}
				>
					{["Learn", "Contribute"].map((element) => {
						return <NavButton key={element} name={element} />;
					})}
				</Animated>
			</div>
			{isAuthenticated && (
				<button
					className={`${styles["logout-button"]}`}
					onClick={() => logout()}
				>
					<RiLogoutBoxRFill />
				</button>
			)}
		</nav>
	);
}
