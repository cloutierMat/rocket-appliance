import React from "react";
import NavButton from './NavButton'
import NavTitle from './NavTitle'

export default function NavBar() {
	return (
	<nav>
		<NavTitle />
		{ ["Learn", "Contribute"].map((element) => {
			return <NavButton name={element} />
		})}
	</nav>

	)
}