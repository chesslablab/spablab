import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid
} from '@mui/material';
import * as board from 'features/board/boardSlice';
import Ws from 'features/ws/Ws';
import SelectColorButtons from 'features/SelectColorButtons';

const PawnPromotionDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    color: 'rand',
  };

  const [fields, setFields] = React.useState(initialState);

  const handlePromote = () => {
    // TODO ...
    Ws.playLan(state.board.lan + 'n');
    dispatch(board.underpromote({
      turn: state.board.turn,
      piece: 'n',
      sq: state.board.lan.slice(-2)
    }));
    dispatch(board.promotionDialog({ open: false }));
  }

  return (
    <Dialog open={state.board.dialogs.promotion.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Pawn Promotion
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center">
          <SelectColorButtons props={fields} />
        </Grid>
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => handlePromote()}
        >
          Promote
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PawnPromotionDialog;
