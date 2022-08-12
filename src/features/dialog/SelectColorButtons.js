import * as React from 'react';
import { Avatar, ButtonGroup, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import wKing from '../../assets/img/pieces/png/150/wKing.png';
import wbKing from '../../assets/img/pieces/png/150/wbKing.png';
import bKing from '../../assets/img/pieces/png/150/bKing.png';
import Pgn from '../../common/Pgn';

const useStyles = makeStyles({
  buttonGroup: {
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#d8d8d8',
  },
});

const SelectColorButtons = ({ props }) => {
  const classes = useStyles();
  const [color, setColor] = React.useState('rand');

  const handleSelectColor = (color) => {
    setColor(color);
  };

  React.useEffect(() => {
    props.color = color;
  }, [color]);

  return (
    <ButtonGroup className={classes.buttonGroup}>
      <IconButton
        aria-label="white"
        title="White"
        onClick={() => handleSelectColor(Pgn.symbol.WHITE)}
      >
        <Avatar
          src={wKing}
          sx={{ width: 55, height: 55 }}
          className={color === Pgn.symbol.WHITE ? classes.selected : null}
        />
      </IconButton>
      <IconButton
        aria-label="random"
        title="Random"
        onClick={() => handleSelectColor('rand')}
      >
        <Avatar
          src={wbKing}
          sx={{ width: 55, height: 55 }}
          className={color === 'rand' ? classes.selected : null}
        />
      </IconButton>
      <IconButton
        aria-label="black"
        title="Black"
        onClick={() => handleSelectColor(Pgn.symbol.BLACK)}
      >
        <Avatar
          src={bKing}
          sx={{ width: 55, height: 55 }}
          className={color === Pgn.symbol.BLACK ? classes.selected : null}
        />
      </IconButton>
    </ButtonGroup>
  );
}

export default SelectColorButtons;
