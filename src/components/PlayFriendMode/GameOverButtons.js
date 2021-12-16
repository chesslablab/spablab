import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Wording from "../../utils/Wording.js";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import rematchOfferDialogActionTypes from "../../constants/rematchOfferDialogActionTypes";

const useStyles = makeStyles((theme) => ({
  paperButton: {
    textTransform: "none",
  },
}));

const GameOverButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const classes = useStyles();

  const [anchorElRematchOffer, setAnchorElRematchOffer] = React.useState(null);

  const handleCloseRematchOffer = () => {
    setAnchorElRematchOffer(null);
  };

  if (state.mode.playfriend.accepted) {
    if (state.board.mate ||
      state.mode.playfriend.draw === Wording.verb.ACCEPT.toLowerCase() ||
      state.mode.playfriend.resign === Wording.verb.ACCEPT.toLowerCase() ||
      state.mode.playfriend.timer.over
    ) {
      return (
        <ButtonGroup variant="contained" size="small" aria-label="small button group">
          <Button
            className={classes.paperButton}
            onClick={() => {
              dispatch({ type: rematchOfferDialogActionTypes.OPEN });
              handleCloseRematchOffer();
            }}
          >
            Offer Rematch
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default GameOverButtons;
