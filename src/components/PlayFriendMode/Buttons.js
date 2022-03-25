import React from 'react';
import GameButtons from './GameButtons';
import GameDialogs from './GameDialogs';
import GameOverButtons from './GameOverButtons';
import GameOverDialogs from './GameOverDialogs';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  buttons: {
    marginBottom: 15,
  },
});

const Buttons = () => {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      <GameButtons />
      <GameDialogs />
      <GameOverButtons />
      <GameOverDialogs />
    </div>
  );
}

export default Buttons;
