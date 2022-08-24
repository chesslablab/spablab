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
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as mode from '../../features/modeSlice';
import * as playComputerDialog from '../../features/dialog/playComputerDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../ws/WsAction';

const PlayComputerDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [dialogData, setDialogData] = React.useState({
    level: 1,
    color: 'rand'
  });

  const handleCreateGame = () => {
    let color;
    dialogData.color === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = dialogData.color;
    const payload = configure();
    dispatch(mode.setStockfish(payload));
    dispatch(mainButtons.setPlayComputer());
    dispatch(playComputerDialog.close());
    Dispatcher.initGui(dispatch);
    WsAction.startStockfishByColor(state, color);
  };

  const handleLevelChange = (event: Event) => {
    setDialogData({
      level: event.target.value,
      color: dialogData.color
    });
  };

  const configure = () => {
    let settings = {
      options: {
        "Skill Level": 11
      },
      params: {
        "depth": 4
      }
    };
    if (dialogData.level === 0) {
      settings.options["Skill Level"] = 6;
      settings.params["depth"] = 2;
    } else if (dialogData.level === 2) {
      settings.options["Skill Level"] = 17;
      settings.params["depth"] = 8;
    } else if (dialogData.level === 3) {
      settings.options["Skill Level"] = 20;
      settings.params["depth"] = 12;
    }

    return settings;
  }

  return (
    <Dialog open={state.playComputerDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Play computer
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(playComputerDialog.close())}>
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

export default PlayComputerDialog;
