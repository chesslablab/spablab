import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paperButton: {
    textTransform: "none",
  },
}));

const GameOverButtons = () => {
  const state = useSelector(state => state);

  const classes = useStyles();

  // TODO: The buttons should also get displayed when the game has been resigned
  // and when a draw has been accepted. 
  if (state.board.mate) {
    return (
      <ButtonGroup variant="contained" size="small" aria-label="small button group">
        <Button
          className={classes.paperButton}
          onClick={() => {
            // TODO
          }}
        >
          Rematch
        </Button>
      </ButtonGroup>
    );
  }

  return null;
}

export default GameOverButtons;
