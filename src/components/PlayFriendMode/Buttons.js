import React from 'react';
import GameButtons from './GameButtons';
import GameOverButtons from './GameOverButtons';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  buttons: {
    marginTop: 10,
  },
});

const Buttons = () => {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      <GameButtons />
      <GameOverButtons />
    </div>
  );
}

export default Buttons;
