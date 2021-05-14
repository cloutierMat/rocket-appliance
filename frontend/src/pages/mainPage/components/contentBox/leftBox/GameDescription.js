import React from 'react';
import {Animated} from "react-animated-css";

export default function GameDescription() {
	return (
	<Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
	<div className="game-description text-default">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis neque sed lorem luctus aliquet. Duis ornare viverra lorem, vitae aliquet eros dapibus sit amet. Fusce gravida volutpat est varius malesuada. Mauris luctus urna sit amet eros.
	</div>
	</Animated>
	)};
