import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import drawOfferDialogActionTypes from '../../constants/dialog/drawOfferDialogActionTypes';
import resignAcceptDialogActionTypes from '../../constants/dialog/resignAcceptDialogActionTypes';
import takebackOfferDialogActionTypes from '../../constants/dialog/takebackOfferDialogActionTypes';

const InvitedButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElRequestTakeback, setAnchorElRequestTakeback] = useState(null);
  const [anchorElDrawOffer, setAnchorElDrawOffer] = useState(null);
  const [anchorElResignAccept, setAnchorElResignAccept] = useState(null);

  const handleCloseRequestTakeback = () => {
    setAnchorElRequestTakeback(null);
  };

  const handleCloseDrawOffer = () => {
    setAnchorElDrawOffer(null);
  };

  const handleCloseResignAccept = () => {
    setAnchorElResignAccept(null);
  };

  if (state.mode.playfriend.accepted) {
    if (!state.board.mate &&
      !state.mode.playfriend.draw &&
      !state.mode.playfriend.resign &&
      !state.mode.playfriend.timer.over
    ) {
      return (
        <ButtonGroup
          size="small"
          aria-label="Game Buttons"
          orientation="vertical"
          fullWidth={true}
        >
          <Button
            onClick={() => {
              dispatch({ type: takebackOfferDialogActionTypes.OPEN });
              handleCloseRequestTakeback();
            }}
          >
            Propose a takeback
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: drawOfferDialogActionTypes.OPEN });
              handleCloseDrawOffer();
            }}
          >
            Offer draw
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: resignAcceptDialogActionTypes.OPEN });
              handleCloseResignAccept();
            }}
          >
            Resign
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default InvitedButtons;
