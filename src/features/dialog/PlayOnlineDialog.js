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
import Pgn from '../../common/Pgn';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as playOnlineDialog from '../../features/dialog/playOnlineDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import * as modeConst from '../../features/mode/modeConst';
import PlayOnlineTable from '../../features/table/PlayOnlineTable';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../features/ws/WsAction';

const PlayOnlineDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [fields, setFields] = React.useState({
    minutes: 5,
    increment: 3,
    color: 'rand',
    variant: variantConst.CLASSICAL,
  });

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
    dispatch(playOnlineDialog.close());
    dispatch(mainButtons.setPlayOnline());
    WsAction.start(state, fields.variant, modeConst.PLAY, {
      settings: {
        min: fields.minutes,
        increment: fields.increment,
        color: fields.color === 'rand'
          ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
          : fields.color,
        submode: 'online'
      }
    });
  }

  return (
    <Dialog open={state.playOnlineDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Play Online
        <IconButton onClick={() => dispatch(playOnlineDialog.close())}>
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
          margin="normal"
          onChange={handleVariantChange}
          >
          <MenuItem key={0} value="classical">
            Classical
          </MenuItem>
          <MenuItem key={1} value="960">
            Fischer Random 960
          </MenuItem>
          <MenuItem key={2} value="capablanca80">
            Capablanca
          </MenuItem>
        </TextField>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCreateGame()}
          sx={{ mt: 2 }}
        >
          Create Game
        </Button>
        <PlayOnlineTable />
      </DialogContent>
    </Dialog>
  );
};

export default PlayOnlineDialog;
