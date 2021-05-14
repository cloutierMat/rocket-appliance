import React from 'react';
import {Animated} from "react-animated-css";

export default function NavTitle() {
   return <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
   <div className="nav-title"></div>
   </Animated>
}
