import { useEffect, useState } from 'react';
import { Avatar, ButtonGroup, IconButton } from '@mui/material';
import wKing from 'assets/img/pieces/png/150/wKing.png';
import wbKing from 'assets/img/pieces/png/150/wbKing.png';
import bKing from 'assets/img/pieces/png/150/bKing.png';
import Pgn from 'common/Pgn';
import styles from 'styles/avatar';

const ColorButtonGroup = ({ props }) => {
  const [color, setColor] = useState('rand');

  useEffect(() => {
    props.color = color;
  }, [props, color]);

  return (
    <ButtonGroup sx={styles.buttonGroup}>
      <IconButton
        aria-label="white"
        title="White"
        onClick={() => setColor(Pgn.symbol.WHITE)}
      >
        <Avatar
          src={wKing}
          sx={color === Pgn.symbol.WHITE ? styles.avatar.selected : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="random"
        title="Random"
        onClick={() => setColor('rand')}
      >
        <Avatar
          src={wbKing}
          sx={color === 'rand' ? styles.avatar.selected : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="black"
        title="Black"
        onClick={() => setColor(Pgn.symbol.BLACK)}
      >
        <Avatar
          src={bKing}
          sx={color === Pgn.symbol.BLACK ? styles.avatar.selected : styles.avatar}
        />
      </IconButton>
    </ButtonGroup>
  );
}

export default ColorButtonGroup;
