import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateMove } from '../actions/boardActions';

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  dispatch(validateMove(state));

  return (
    <div className="movetext">
      {state.board.movetext}
    </div>
  );
}

export default MoveValidator;
