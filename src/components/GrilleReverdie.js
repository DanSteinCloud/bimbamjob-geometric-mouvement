import React from 'react';
import {useState, useEffect, useRef} from "react";

export default function GrilleReverdie({currentCell, value, fullfilled, onClick, isDisabled, enabled,label, showCoordinate, coordinate}) {
 const ref = useRef(null);
 return (
   <button
      ref={ref}
      type="button"
      color="white"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className="cell cell-activated"
   >{showCoordinate ? `(` + coordinate[0] + `,` + coordinate[1] + `)`: ''}
   </button>
);
}