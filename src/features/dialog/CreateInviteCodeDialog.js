import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import Pgn from '../../common/Pgn';
import { setPlayAFriend } from '../../features/mainButtonsSlice';
import { closeCreateInviteCodeDialog } from '../../features/dialog/createInviteCodeDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../ws/WsAction';

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.createInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Play a friend
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closeCreateInviteCodeDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      {state.mode.play && state.mode.play.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [dialogData, setDialogData] = React.useState({
    minutes: 5,
    increment: 3,
    color: 'rand'
  });

  const handleMinutesChange = (event: Event, minutes: number) => {
    setDialogData({
      minutes: minutes,
      increment: dialogData.increment,
      color: dialogData.color
    });
  };

  const handleIncrementChange = (event: Event, increment: number) => {
    setDialogData({
      minutes: dialogData.minutes,
      increment: increment,
      color: dialogData.color
    });
  };

  const handleCreateCode = () => {
    const settings = {
      min: dialogData.minutes,
      increment: dialogData.increment,
      color: dialogData.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : dialogData.color,
      submode: 'friend'
    };
    dispatch(setPlayAFriend());
    WsAction.startPlay(state, settings);
  }

  return (
    <div>
      <DialogContent>
        <Typography id="input-minutes" gutterBottom>
          Minutes per side
        </Typography>
        <Slider
          name="min"
          aria-label="Minutes"
          defaultValue={5}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={60}
          onChange={handleMinutesChange}
        />
        <Typography id="input-increment" gutterBottom>
          Increment in seconds
        </Typography>
        <Slider
          name="increment"
          aria-label="Increment"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={60}
          onChange={handleIncrementChange}
        />
        <Grid container justifyContent="center">
          <SelectColorButtons props={dialogData} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCreateCode()}
        >
          Create Code
        </Button>
      </DialogActions>
    </div>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          type="text"
          name="sharecode"
          label="Share this code with a friend"
          value={state.mode.play.hash}
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(state.mode.play.hash);
            dispatch(closeCreateInviteCodeDialog());
        }}>
          Copy and Play
        </Button>
      </DialogActions>
    </div>
  );
}

export default CreateInviteCodeDialog;
