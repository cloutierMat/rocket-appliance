import React from 'react';
import {Animated} from "react-animated-css";

export default function SearchDescription() {
	return (
  <Animated animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
	<div className="text-default">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis neque sed lorem luctus aliquet. 
	</div>
	</Animated>
)}