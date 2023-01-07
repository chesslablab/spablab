import * as React from 'react';
import { Avatar, ButtonGroup, IconButton } from '@mui/material';
import wKing from '../../assets/img/pieces/png/150/wKing.png';
import wbKing from '../../assets/img/pieces/png/150/wbKing.png';
import bKing from '../../assets/img/pieces/png/150/bKing.png';
import Pgn from '../../common/Pgn';

const styles = {
  avatar: {
    width: 55,
    height: 55,
  },
  buttonGroup: {
    mt: 1,
    mb: 1,
  },
  selectedAvatar: {
    width: 55,
    height: 55,
    backgroundColor: '#d8d8d8',
  },
};

const SelectColorButtons = ({ props }) => {
  const [color, setColor] = React.useState('rand');

  const handleSelectColor = (color) => {
    setColor(color);
  };

  React.useEffect(() => {
    props.color = color;
  }, [color]);

  return (
    <ButtonGroup sx={styles.buttonGroup}>
      <IconButton
        aria-label="white"
        title="White"
        onClick={() => handleSelectColor(Pgn.symbol.WHITE)}
      >
        <Avatar
          src={wKing}
          sx={color === Pgn.symbol.WHITE ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="random"
        title="Random"
        onClick={() => handleSelectColor('rand')}
      >
        <Avatar
          src={wbKing}
          sx={color === 'rand' ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="black"
        title="Black"
        onClick={() => handleSelectColor(Pgn.symbol.BLACK)}
      >
        <Avatar
          src={bKing}
          sx={color === Pgn.symbol.BLACK ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
    </ButtonGroup>
  );
}

export default SelectColorButtons;
