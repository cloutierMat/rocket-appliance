import React from 'react';
import Gallery from './Gallery';
import GameDescription from './GameDescription';

export default function LeftBox() {
   return (
      <div className="left-box">
         <Gallery />
         <GameDescription />
      </div>
   );
}
