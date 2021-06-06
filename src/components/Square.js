import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { click as clickSquare } from 'actions/squareActions';
import { unicode } from 'utils/Pieces';

const Square = ({ piece, color }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div
      className={['square', color].join(' ')}
      onClick={() => dispatch(clickSquare())}
    >
      <span>
        {unicode[piece].char}
      </span>
    </div>
  );
}

export default Square;
