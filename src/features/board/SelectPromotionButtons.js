import * as React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, ButtonGroup, IconButton } from '@mui/material';
import bQueen from 'assets/img/pieces/png/150/bQueen.png';
import bRook from 'assets/img/pieces/png/150/bRook.png';
import bBishop from 'assets/img/pieces/png/150/bBishop.png';
import bKnight from 'assets/img/pieces/png/150/bKnight.png';
import wQueen from 'assets/img/pieces/png/150/wQueen.png';
import wRook from 'assets/img/pieces/png/150/wRook.png';
import wBishop from 'assets/img/pieces/png/150/wBishop.png';
import wKnight from 'assets/img/pieces/png/150/wKnight.png';
import Pgn from 'common/Pgn';

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

const SelectPromotionButtons = ({ props }) => {
  const state = useSelector(state => state);

  const [piece, setPiece] = React.useState('Q');

  const handleSelectPiece = (piece) => {
    setPiece(piece);
  };

  React.useEffect(() => {
    props.piece = piece;
  }, [props, piece]);

  return (
    <ButtonGroup sx={styles.buttonGroup}>
      <IconButton
        aria-label="queen"
        title="Queen"
        onClick={() => handleSelectPiece('Q')}
      >
        <Avatar
          src={state.board.turn === Pgn.symbol.BLACK ? wQueen : bQueen}
          sx={piece === 'Q' ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="rook"
        title="Rook"
        onClick={() => handleSelectPiece('R')}
      >
        <Avatar
          src={state.board.turn === Pgn.symbol.BLACK ? wRook : bRook}
          sx={piece === 'R' ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="bishop"
        title="Bishop"
        onClick={() => handleSelectPiece('B')}
      >
        <Avatar
          src={state.board.turn === Pgn.symbol.BLACK ? wBishop : bBishop}
          sx={piece === 'B' ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
      <IconButton
        aria-label="knight"
        title="Knight"
        onClick={() => handleSelectPiece('N')}
      >
        <Avatar
          src={state.board.turn === Pgn.symbol.BLACK ? wKnight : bKnight}
          sx={piece === 'N' ? styles.selectedAvatar : styles.avatar}
        />
      </IconButton>
    </ButtonGroup>
  );
}

export default SelectPromotionButtons;
