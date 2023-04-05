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
  TextField,
  Typography
} from '@mui/material';
import Pgn from '../../common/Pgn';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as playComputerDialog from '../../features/dialog/playComputerDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import * as modeConst from '../../features/mode/modeConst';
import * as mode from '../../features/mode/modeSlice';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../features/ws/WsAction';

const PlayComputerDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [fields, setFields] = React.useState({
    level: 1,
    color: 'rand',
    fen: ''
  });

  const handleCreateGame = () => {
    let color = fields.color === 'rand'
      ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : fields.color;
    const payload = configure(color);
    dispatch(mode.setStockfish(payload));
    dispatch(mainButtons.setPlayComputer());
    dispatch(playComputerDialog.close());
    Dispatcher.initGui(dispatch);
    if (fields.fen) {
      WsAction.start(state, variantConst.CLASSICAL, modeConst.STOCKFISH, {
        fen: fields.fen
      });
    } else {
      WsAction.start(state, variantConst.CLASSICAL, modeConst.STOCKFISH, {
        color: color
      });
    }
  };

  const handleLevelChange = (event: Event) => {
    setFields({
      ...fields,
      level: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const configure = (color) => {
    let settings = {
      color: color,
      options: {
        "Skill Level": 11
      },
      params: {
        "depth": 4
      }
    };
    if (fields.level === 0) {
      settings.options["Skill Level"] = 6;
      settings.params["depth"] = 2;
    } else if (fields.level === 2) {
      settings.options["Skill Level"] = 17;
      settings.params["depth"] = 8;
    } else if (fields.level === 3) {
      settings.options["Skill Level"] = 20;
      settings.params["depth"] = 12;
    }

    return settings;
  }

  return (
    <Dialog open={state.playComputerDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Play Computer
        <IconButton onClick={() => dispatch(playComputerDialog.close())}>
          <CloseIcon />
        </IconButton>
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
          <SelectColorButtons props={fields} />
        </Grid>
        <TextField
          fullWidth
          name="fen"
          label="From FEN position"
          variant="filled"
          margin="normal"
          onChange={handleFenChange}
        />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCreateGame()}
          sx={{ mt: 2 }}
        >
          Create Game
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default PlayComputerDialog;
