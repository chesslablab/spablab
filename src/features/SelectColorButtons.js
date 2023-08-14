import * as React from 'react';
import { Avatar, ButtonGroup, IconButton } from '@mui/material';
import wKing from 'assets/img/pieces/png/150/wKing.png';
import wbKing from 'assets/img/pieces/png/150/wbKing.png';
import bKing from 'assets/img/pieces/png/150/bKing.png';
import Pgn from 'common/Pgn';
import styles from 'styles/avatar';

const SelectColorButtons = ({ props }) => {
  const [color, setColor] = React.useState('rand');

  const handleSelectColor = (color) => {
    setColor(color);
  };

  React.useEffect(() => {
    props.color = color;
  }, [props, color]);

  return (
    <ButtonGroup sx={styles.buttonGroup}>
      <IconButton
        aria-label="white"
        title="White"
        onClick={() => handleSelectColor(Pgn.symbol.WHITE)}
      >
        <Avatar
          src={wKing}
          sx={color === Pgn.symbol.WHITE ? styles.avatar.selected : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="random"
        title="Random"
        onClick={() => handleSelectColor('rand')}
      >
        <Avatar
          src={wbKing}
          sx={color === 'rand' ? styles.avatar.selected : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="black"
        title="Black"
        onClick={() => handleSelectColor(Pgn.symbol.BLACK)}
      >
        <Avatar
          src={bKing}
          sx={color === Pgn.symbol.BLACK ? styles.avatar.selected : styles.avatar}
        />
      </IconButton>
    </ButtonGroup>
  );
}

export default SelectColorButtons;
