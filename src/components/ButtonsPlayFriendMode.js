import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import takebackOfferDialogActionTypes from '../constants/takebackAcceptDialogActionTypes';

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

  const handleCloseRequestTakeback = () => {
    setAnchorElRequestTakeback(null);
  };  

  if (state.mode.playfriend.accepted) {
    return (
      <div>
        <Button 
        variant="outlined"
        className={classes.paperButton}
        onClick={() => {
          dispatch({ type: takebackOfferDialogActionTypes.OPEN });
          handleCloseRequestTakeback();
        }}
        >
          Propose a takeback
        </Button>

        <Button 
        variant="outlined"
        className={classes.paperButton}
        >
          Offer draw
        </Button>

        <Button 
        variant="outlined"
        className={classes.paperButton}
        >
          Resign
        </Button>
      </div>
    );
  }

  return null;
}

export default ButtonsPlayFriendMode;