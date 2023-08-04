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
  MenuItem,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import Pgn from 'common/Pgn';
import PlayOnlineTable from 'features/mode/play/table/PlayOnlineTable';
import * as playMode from 'features/mode/playModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';
import SelectColorButtons from 'features/SelectColorButtons';

const PlayOnlineDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    minutes: 5,
    increment: 3,
    color: 'rand',
    variant: variantConst.CLASSICAL,
  };

  const [fields, setFields] = React.useState(initialState);

  const handleMinutesChange = (event: Event) => {
    setFields({
      ...fields,
      minutes: event.target.value
    });
  };

  const handleIncrementChange = (event: Event) => {
    setFields({
      ...fields,
      increment: event.target.value
    });
  };

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleCreateGame = () => {
    multiAction.initGui(dispatch);
    dispatch(nav.setPlay());
    Ws.start(fields.variant, modeConst.PLAY, {
      settings: {
        min: fields.minutes,
        increment: fields.increment,
        color: fields.color === 'rand'
          ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
          : fields.color,
        submode: 'online'
      }
    });
    setFields(initialState);
  }

  return (
    <Dialog open={state.playMode.dialogs.playOnline.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Play Online
        <IconButton onClick={() => dispatch(playMode.playOnlineDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography
          id="input-minutes"
          align="center"
          gutterBottom
        >
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
        <Typography
          id="input-increment"
          align="center"
          gutterBottom
        >
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
          <SelectColorButtons props={fields} />
        </Grid>
        <TextField
          select
          required
          fullWidth
          name="variant"
          label="Variant"
          variant="filled"
          defaultValue={variantConst.CLASSICAL}
          onChange={handleVariantChange}
          margin="dense"
          >
          <MenuItem key={0} value="classical">
            Classical
          </MenuItem>
          <MenuItem key={1} value="960">
            Fischer Random 960
          </MenuItem>
          <MenuItem key={2} value="capablanca">
            Capablanca
          </MenuItem>
        </TextField>
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => handleCreateGame()}
        >
          Create Game
        </Button>
        <PlayOnlineTable />
      </DialogContent>
    </Dialog>
  );
};

export default PlayOnlineDialog;
