import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  Typography
} from '@mui/material';
import Pgn from '../../common/Pgn';
import { setPlayOnline } from '../../features/mainButtonsSlice';
import { closePlayOnlineDialog } from '../../features/dialog/playOnlineDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import PlayOnlineTable from '../../features/table/PlayOnlineTable';
import WsAction from '../../ws/WsAction';

const PlayOnlineDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [dialogData, setDialogData] = React.useState({
    minutes: 5,
    increment: 3,
    color: 'rand'
  });

  const handleMinutesChange = (event: Event) => {
    setDialogData({
      minutes: event.target.value,
      increment: dialogData.increment,
      color: dialogData.color
    });
  };

  const handleIncrementChange = (event: Event) => {
    setDialogData({
      minutes: dialogData.minutes,
      increment: event.target.value,
      color: dialogData.color
    });
  };

  const handleCreateGame = () => {
    const settings = {
      min: dialogData.minutes,
      increment: dialogData.increment,
      color: dialogData.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : dialogData.color,
      submode: 'online'
    };
    dispatch(closePlayOnlineDialog());
    dispatch(setPlayOnline());
    WsAction.startPlay(state, settings);
  }

  return (
    <Dialog open={state.playOnlineDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Play online
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closePlayOnlineDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Typography id="input-minutes" gutterBottom>
          Minutes per side
        </Typography>
        <Slider
          name="minutes"
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
        <PlayOnlineTable />
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
};

export default PlayOnlineDialog;
