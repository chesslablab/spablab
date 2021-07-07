import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  return (
    <div className="movetext">
      {state.board.movetext}
    </div>
  );
}

export default MoveValidator;
