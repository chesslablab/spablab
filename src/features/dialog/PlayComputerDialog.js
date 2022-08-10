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
  TextField,
  Typography
} from '@mui/material';
import wKing from '../../assets/img/pieces/png/150/wKing.png';
import wbKing from '../../assets/img/pieces/png/150/wbKing.png';
import bKing from '../../assets/img/pieces/png/150/bKing.png';
import Pgn from '../../common/Pgn';
import { closePlayComputerDialog } from '../../features/dialog/playComputerDialogSlice';
import { setPlayComputer } from '../../features/mainButtonsSlice';
import { setStockfish } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const PlayComputerDialog = () => {
  const state = useSelector(state => state);
  const [level, setLevel] = React.useState(1);
  const dispatch = useDispatch();

  const configure = (level) => {
    let settings = {
      options: {
        "Skill Level": 11
      },
      params: {
        "depth": 4
      }
    };
    if (level === 0) {
      settings.options["Skill Level"] = 6;
      settings.params["depth"] = 2;
    } else if (level === 2) {
      settings.options["Skill Level"] = 17;
      settings.params["depth"] = 8;
    } else if (level === 3) {
      settings.options["Skill Level"] = 20;
      settings.params["depth"] = 12;
    }

    return settings;
  }

  const handlePlay = (color) => {
    if (color === 'rand') {
      color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
    }
    const payload = configure(level);
    WsAction.startStockfishByColor(state, color);
    dispatch(setStockfish(payload));
    dispatch(setPlayComputer());
    dispatch(closePlayComputerDialog());
  }

  const handleLevelChange = (event: Event, level: number) => {
    setLevel(level);
  };

  return (
    <Dialog open={state.playComputerDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Play computer
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closePlayComputerDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Typography
          id="level"
          gutterBottom
          align="center"
        >
          Difficulty level
        </Typography>
        <Slider
          name="level"
          aria-label="Level"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={3}
          marks
          onChange={handleLevelChange}
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
      </DialogContent>
    </Dialog>
  );
}

export default PlayComputerDialog;
