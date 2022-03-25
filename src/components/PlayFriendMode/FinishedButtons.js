import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import rematchOfferDialogActionTypes from "../../constants/dialog/rematchOfferDialogActionTypes";
import Wording from "../../utils/Wording.js";

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: 15,
  },
});

const FinishedButtons = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElRematchOffer, setAnchorElRematchOffer] = useState(null);

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
        <ButtonGroup
          className={classes.buttonGroup}
          orientation="vertical"
          size="small"
          aria-label="Game Over"
          fullWidth={true}
        >
          <Button
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

export default FinishedButtons;
