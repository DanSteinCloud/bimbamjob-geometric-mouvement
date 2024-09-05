import React from 'react';

export default function Grille({filled, onClick, isDisabled, label}) {
 return (
   <button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
   />
);
}