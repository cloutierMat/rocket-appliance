import React from 'react';
import NavButton from './NavButton';
import NavTitle from './NavTitle';
import {Animated} from "react-animated-css";

export default function NavBar(props) {
   const {setPagePointer} = props
   return (
      <nav>
         <NavTitle />
         <Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
         <div className="button-container">
            {['Learn', 'Contribute'].map(element => {
               return <NavButton key={element} name={element} setPagePointer={setPagePointer}/>;
               
            })}
         </div>
         </Animated>
      </nav>
   );
}
