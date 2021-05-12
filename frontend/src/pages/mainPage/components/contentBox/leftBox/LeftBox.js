import React, { useState } from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';

export default function LeftBox(props) {
   const { pagePointer } = props;
   const [hoverOnCard, setHoverOnCard] = useState(false); //temporary false value for hovering over game cards

   function handleHover() {
      setHoverOnCard(true);
      console.log('Hi WILL');
   }

   return (
      <div className="left-box">
         <Gallery onMouseEnter={handleHover} pagePointer={pagePointer} />
         {hoverOnCard ? <GameDescription /> : <></>}
      </div>
   );
}
