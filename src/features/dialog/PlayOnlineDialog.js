import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  Typography
} from '@mui/material';
import wKing from '../../assets/img/pieces/png/150/wKing.png';
import wbKing from '../../assets/img/pieces/png/150/wbKing.png';
import bKing from '../../assets/img/pieces/png/150/bKing.png';
import Pgn from '../../common/Pgn';
import PlayOnlineTable from '../../features/table/PlayOnlineTable';
import { closePlayOnlineDialog } from '../../features/dialog/playOnlineDialogSlice';
import { setPlayOnline } from '../../features/mainButtonsSlice';
import WsAction from '../../ws/WsAction';

const PlayOnlineDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [minutes, setMinutes] = React.useState(5);
  const [increment, setIncrement] = React.useState(3);

  const handleMinutesChange = (event: Event, minutes: number) => {
    setMinutes(minutes);
  };

  const handleIncrementChange = (event: Event, increment: number) => {
    setIncrement(increment);
  };

  const handlePlay = (color) => {
    const settings = {
      color: color === 'rand' ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK : color,
      min: minutes,
      increment: increment,
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
          <ButtonGroup>
            <IconButton
              aria-label="white"
              title="White"
              onClick={() => handlePlay(Pgn.symbol.WHITE)}
            >
              <Avatar
                src={wKing}
                sx={{ width: 55, height: 55 }}
              />
            </IconButton>
            <IconButton
              aria-label="random"
              title="Random"
              onClick={() => handlePlay('rand')}
            >
              <Avatar
                src={wbKing}
                sx={{ width: 55, height: 55 }}
              />
            </IconButton>
            <IconButton
              aria-label="black"
              title="Black"
              onClick={() => handlePlay(Pgn.symbol.BLACK)}
            >
              <Avatar
                src={bKing}
                sx={{ width: 55, height: 55 }}
              />
            </IconButton>
          </ButtonGroup>
        </Grid>
        <PlayOnlineTable />
      </DialogContent>
    </Dialog>
  );
};

export default PlayOnlineDialog;
