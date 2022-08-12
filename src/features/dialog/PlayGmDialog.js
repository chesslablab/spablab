import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material';
import Pgn from '../../common/Pgn';
import { setTraining } from '../../features/mainButtonsSlice';
import { closePlayGmDialog } from '../../features/dialog/playGmDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../ws/WsAction';

const PlayGmDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [dialogData, setDialogData] = React.useState({
    color: 'rand'
  });

  const handleCreateGame = () => {
    let color;
    dialogData.color === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = dialogData.color;
    dispatch(setTraining());
    dispatch(closePlayGmDialog());
    WsAction.startGm(state, color);
  }

  return (
    <Dialog open={state.playGmDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Guess the move
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closePlayGmDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center">
          <SelectColorButtons props={dialogData} />
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCreateGame()}
        >
          Create Game
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default PlayGmDialog;
