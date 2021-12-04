import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import takebackOfferDialogActionTypes from '../constants/takebackOfferDialogActionTypes';
import drawOfferDialogActionTypes from '../constants/drawOfferDialogActionTypes';
import resignAcceptDialogActionTypes from '../constants/resignAcceptDialogActionTypes';

const useStyles = makeStyles((theme) => ({
  paperButton: {
    textTransform: "none",
  },
}));

const ButtonsPlayFriendMode = () => {
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
      !state.mode.playfriend.resign
    ) {
      return (
        <ButtonGroup size="small" aria-label="small button group">
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

export default ButtonsPlayFriendMode;
