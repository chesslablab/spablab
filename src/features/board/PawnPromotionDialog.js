import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  Grid
} from '@mui/material';
import * as board from 'features/board/boardSlice';
import Ws from 'features/ws/Ws';
import SelectPromotionButtons from 'features/board/SelectPromotionButtons';

const PawnPromotionDialog = ({ props }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [fields] = React.useState({
    piece: 'Q',
  });

  const handlePromote = (event) => {
    event.preventDefault();
    Ws.playLan(state.board.lan + fields.piece);
    dispatch(board.underpromote({
      turn: state.board.turn,
      piece: fields.piece,
      sq: state.board.lan.slice(-2)
    }));
    dispatch(board.promotionDialog({ open: false }));
  }

  return (
    <Dialog open={state.board.dialogs.promotion.open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <form onSubmit={handlePromote}>
          <Grid container justifyContent="center">
            <SelectPromotionButtons props={fields} />
          </Grid>
          <Button sx={{ mt: 2 }}
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
