import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const ButtonResignGame = () => {
  const state = useSelector(state => state);

  if (state.mode.playfriend.accepted) {
    return (
      <div>
        <Button variant="outlined">Resign</Button>
      </div>
    );
  }

  return null;
}

export default ButtonResignGame;