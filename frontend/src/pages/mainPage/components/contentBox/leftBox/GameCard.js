import React from 'react';

export default function GameCard(props) {
   const { name, onMouseEnter, pagePointer } = props;
   return (
      <div
         className="game-card card-rotate"
         onMouseEnter={onMouseEnter}
         onClick={() => {
            pagePointer(name);
         }}
      >
         {name}
      </div>
   );
}
