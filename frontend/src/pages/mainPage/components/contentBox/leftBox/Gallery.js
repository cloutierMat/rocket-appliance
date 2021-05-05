import React from 'react';
import GameCard from './GameCard';

export default function Gallery(props) {
   const { onMouseEnter } = props;
   return (
      <div className="gallery-wrapper">
         <div className="gallery">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(name => {
               return (
                  <GameCard
                     key={name}
                     name={name}
                     onMouseEnter={onMouseEnter}
                  />
               );
            })}
         </div>
      </div>
   );
}
