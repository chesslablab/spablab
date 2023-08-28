import { useState } from 'react';
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
import * as modeConst from 'features/mode/modeConst';
import * as playMode from 'features/mode/playModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import SelectColorButtons from 'features/SelectColorButtons';

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);
  
  const dispatch = useDispatch();

  return (
    <Dialog open={state.playMode.dialogs.createInviteCode.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Play a Friend
        <IconButton onClick={() => dispatch(playMode.createInviteCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.playMode.play?.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    minutes: 5,
    increment: 3,
    color: 'rand',
    variant: variantConst.CLASSICAL,
    fen: '',
    startPos: '',
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

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleStartPosChange = (event: Event) => {
    setFields({
      ...fields,
      startPos: event.target.value
    });
  };

  const handleCreateCode = (event) => {
    event.preventDefault();
    dispatch(nav.setPlay());
    let settings = {
      min: fields.minutes,
      increment: fields.increment,
      color: fields.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : fields.color,
      submode: 'friend',
      ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
      ...(fields?.fen && {fen: event.target.elements.fen?.value})
    };
    Ws.start(fields.variant, modeConst.PLAY, { settings: JSON.stringify(settings) });
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <Typography
          id="input-minutes"
          align="center"
          gutterBottom
        >
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
        {
          fields.variant === variantConst.CHESS_960
            ? <TextField
                fullWidth
                required
                variant="filled"
                name="startPos"
                label="Start position"
                helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
                onChange={handleStartPosChange}
                margin="dense"
            />
            : null
        }
        <TextField
          fullWidth
          variant="filled"
          name="fen"
          label="From FEN position"
          onChange={handleFenChange}
          margin="dense"
        />
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Create Invite Code
        </Button>
      </form>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.playMode.play.hash}
        margin="dense"
      />
      <Button sx={{ mt: 2 }}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(state.playMode.play.hash);
          dispatch(playMode.createInviteCodeDialog({ open: false }));
      }}>
        Copy and Play
      </Button>
    </DialogContent>
  );
}

export default CreateInviteCodeDialog;
