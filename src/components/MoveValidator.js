import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playfen } from '../actions/serverActions';
import { undo } from '../actions/boardActions';

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (!state.board.picked && state.board.fen) {
    dispatch(playfen(state.server.ws, state.board.fen)).then((data) => {
      const playfen = JSON.parse(data).playfen;
      if (!playfen.legal) {
        dispatch(undo());
      }
    });
  }

  return null;
}

export default MoveValidator;
