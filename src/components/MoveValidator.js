import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import Typography from '@material-ui/core/Typography';

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  return (
    <Typography variant="subtitle1" gutterBottom>
      {state.board.movetext}
    </Typography>
  );
}

export default MoveValidator;
