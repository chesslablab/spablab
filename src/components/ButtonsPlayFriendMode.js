import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const ButtonsPlayFriendMode = () => {
  const state = useSelector(state => state);

  if (state.mode.playfriend.accepted) {
    return (
      <div>
        <Button variant="outlined">Propose a takeback</Button>
      </div>
    );
  }

  return null;
}

export default ButtonsPlayFriendMode;