import React from 'react';

export default function GameCard(props) {
   const { name, onMouseEnter } = props;
   return (
      <div className="game-card" onMouseEnter={onMouseEnter}>
         {name}
      </div>
   );
}
