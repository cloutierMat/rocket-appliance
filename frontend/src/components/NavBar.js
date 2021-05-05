import React from 'react';
import NavButton from './NavButton';
import NavTitle from './NavTitle';

export default function NavBar() {
   return (
      <nav>
         <NavTitle />
         <div className="button-container">
            {['Learn', 'Contribute'].map(element => {
               return <NavButton name={element} />;
            })}
         </div>
      </nav>
   );
}
