import React from 'react';
import {useState, useEffect, useRef} from "react";

export default function GrilleTondue({currentCell, value, fullfilled, onClick, isDisabled, enabled,label, showCoordinate, coordinate}) {
 return (
   <button
      type="button"
      color="black"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className="cell"
   >{showCoordinate ? `(` + coordinate[0] + `,` + coordinate[1] + `)`: ''}
   </button>
);
}