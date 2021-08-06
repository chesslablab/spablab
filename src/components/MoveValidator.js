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
    <div className="move-validator">
      <Typography variant="body2" color="textSecondary" component="p">
        {state.board.movetext}
      </Typography>
    </div>
  );
}

export default MoveValidator;
