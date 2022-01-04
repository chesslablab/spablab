import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import takebackOfferDialogActionTypes from '../../constants/takebackOfferDialogActionTypes';
import drawOfferDialogActionTypes from '../../constants/drawOfferDialogActionTypes';
import resignAcceptDialogActionTypes from '../../constants/resignAcceptDialogActionTypes';

const useStyles = makeStyles((theme) => ({
  paperButton: {
    textTransform: "none",
  },
}));

const GameButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const classes = useStyles();

  const [anchorElRequestTakeback, setAnchorElRequestTakeback] = React.useState(null);
  const [anchorElDrawOffer, setAnchorElDrawOffer] = React.useState(null);
  const [anchorElResignAccept, setAnchorElResignAccept] = React.useState(null);

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
          aria-label="small button group"
          orientation="vertical"
          fullWidth={true}
        >
          <Button
            className={classes.paperButton}
            onClick={() => {
              dispatch({ type: takebackOfferDialogActionTypes.OPEN });
              handleCloseRequestTakeback();
            }}
          >
            Propose a takeback
          </Button>
          <Button
            className={classes.paperButton}
            onClick={() => {
              dispatch({ type: drawOfferDialogActionTypes.OPEN });
              handleCloseDrawOffer();
            }}
          >
            Offer draw
          </Button>
          <Button
            className={classes.paperButton}
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

export default GameButtons;
