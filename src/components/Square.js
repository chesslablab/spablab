import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unicode } from 'utils/Pieces';

const Square = ({ square, color }) => {
  const state = useSelector(state => state);

  return (
    <div className={['square', color].join(' ')}>
      <span>
        {unicode[square].char}
      </span>
    </div>
  );
}

export default Square;
