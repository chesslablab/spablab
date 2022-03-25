import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import rematchOfferDialogActionTypes from "../../constants/dialog/rematchOfferDialogActionTypes";
import Wording from "../../utils/Wording.js";

const GameOverButtons = () => {
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
        <ButtonGroup variant="contained" size="small" aria-label="small button group">
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

export default GameOverButtons;
