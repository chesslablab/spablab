import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import requestTakebackDialogActionTypes from '../constants/requestTakebackDialogActionTypes';

const ButtonsPlayFriendMode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElRequestTakeback, setAnchorElRequestTakeback] = React.useState(null);

  const handleCloseRequestTakeback = () => {
    setAnchorElRequestTakeback(null);
  };

  if (state.mode.playfriend.accepted) {
    return (
      <div>
        <Button 
        variant="outlined"
        onClick={() => {
          dispatch({ type: requestTakebackDialogActionTypes.OPEN });
          handleCloseRequestTakeback();
        }}
        >
          Propose a takeback
        </Button>
      </div>
    );
  }

  return null;
}

export default ButtonsPlayFriendMode;