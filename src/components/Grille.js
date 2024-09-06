import React from 'react';

export default function Grille({filled, onClick, isDisabled, label, showCoordinate, coordinate}) {
 return (
   <button
      type="button"
      color="white"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
   >{showCoordinate ? `(` + coordinate[0] + `,` + coordinate[1] + `)`: ''}
   </button>
);
}