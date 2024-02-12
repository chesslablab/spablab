'use client'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pgn } from '@chesslablab/reactblab';
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
import PlayOnlineTable from 'features/mode/play/table/PlayOnlineTable';
import * as playMode from 'features/mode/playModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import multiAction from 'features/multiAction';
import ColorButtonGroup from 'features/ColorButtonGroup';
import styles from 'styles/dialog';

const PlayOnlineDialog = () => {
  const state = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const initialState = {
    minutes: 5,
    increment: 3,
    color: 'rand',
    variant: variantConst.CLASSICAL,
  };

  const [fields, setFields] = useState(initialState);

  const handleMinutesChange = (event) => {
    setFields({
      ...fields,
      minutes: event.target.value
    });
  };

  const handleIncrementChange = (event) => {
    setFields({
      ...fields,
      increment: event.target.value
    });
  };

  const handleVariantChange = (event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleCreateGame = () => {
    multiAction.initGui(dispatch);
    dispatch(nav.setPlay());
    dispatch({
      type: 'ws/start',
      payload: {
        variant: fields.variant,
        mode: modeConst.PLAY,
        settings: {
          min: fields.minutes,
          increment: fields.increment,
          color: fields.color === 'rand'
            ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
            : fields.color,
          submode: 'online',
        },
      },
    });

    setFields(initialState);
  }

  return (
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.playOnline.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        Play Online
        <IconButton onClick={() => dispatch(playMode.playOnlineDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <PlayOnlineTable />
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
          <ColorButtonGroup props={fields} />
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
            Fischer Random
          </MenuItem>
          <MenuItem key={2} value="capablanca">
            Capablanca
          </MenuItem>
          <MenuItem key={3} value="capablanca-fischer">
            Capablanca-Fischer
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
      </DialogContent>
    </Dialog>
  );
};

export default PlayOnlineDialog;
