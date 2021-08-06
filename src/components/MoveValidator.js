import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {state.board.movetext}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MoveValidator;
