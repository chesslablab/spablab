import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import Typography from '@material-ui/core/Typography';

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  return (
    <Typography variant="subtitle1">
      {state.board.movetext}
    </Typography>
  );
}

export default MoveValidator;
