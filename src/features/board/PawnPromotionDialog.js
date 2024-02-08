import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pgn } from '@chesslablab/reactblab';
import {
  Avatar,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Grid,
  IconButton
} from '@mui/material';
import bQueen from 'assets/img/pieces/png/150/bQueen.png';
import bRook from 'assets/img/pieces/png/150/bRook.png';
import bBishop from 'assets/img/pieces/png/150/bBishop.png';
import bKnight from 'assets/img/pieces/png/150/bKnight.png';
import wQueen from 'assets/img/pieces/png/150/wQueen.png';
import wRook from 'assets/img/pieces/png/150/wRook.png';
import wBishop from 'assets/img/pieces/png/150/wBishop.png';
import wKnight from 'assets/img/pieces/png/150/wKnight.png';
import * as board from 'features/board/boardSlice';
import Ws from 'socket/Ws';
import styles from 'styles/avatar';

const PawnPromotionDialog = () => {
  const state = useSelector(state => state.board);

  const dispatch = useDispatch();

  const [piece, setPiece] = useState('Q');

  const handleSelectPiece = (piece) => {
    setPiece(piece);
  };

  const handlePromote = (event) => {
    event.preventDefault();
    Ws.playLan(state.lan + piece);
    dispatch(board.underpromote({
      turn: state.turn,
      piece: piece,
      sq: state.lan.slice(-2)
    }));
    dispatch(board.promotionDialog({ open: false }));
    setPiece('Q');
  }

  return (
    <Dialog open={state.dialogs.promotion.open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <form onSubmit={handlePromote}>
          <Grid container justifyContent="center">
            <ButtonGroup sx={styles.buttonGroup}>
              <IconButton
                aria-label="queen"
                title="Queen"
                onClick={() => handleSelectPiece('Q')}
              >
                <Avatar
                  src={state.turn === Pgn.symbol.BLACK ? wQueen : bQueen}
                  sx={piece === 'Q' ? styles.avatar.selected : styles.avatar}
                />
              </IconButton>
              <IconButton
                aria-label="rook"
                title="Rook"
                onClick={() => handleSelectPiece('R')}
              >
                <Avatar
                  src={state.turn === Pgn.symbol.BLACK ? wRook : bRook}
                  sx={piece === 'R' ? styles.avatar.selected : styles.avatar}
                />
              </IconButton>
              <IconButton
                aria-label="bishop"
                title="Bishop"
                onClick={() => handleSelectPiece('B')}
              >
                <Avatar
                  src={state.turn === Pgn.symbol.BLACK ? wBishop : bBishop}
                  sx={piece === 'B' ? styles.avatar.selected : styles.avatar}
                />
              </IconButton>
              <IconButton
                aria-label="knight"
                title="Knight"
                onClick={() => handleSelectPiece('N')}
              >
                <Avatar
                  src={state.turn === Pgn.symbol.BLACK ? wKnight : bKnight}
                  sx={piece === 'N' ? styles.avatar.selected : styles.avatar}
                />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Button sx={{ mt: 2 }}
            id="PawnPromotionDialog-Button-promote"
            fullWidth
            size="large"
            variant="contained"
            type="submit"
          >
            Promote
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PawnPromotionDialog;
