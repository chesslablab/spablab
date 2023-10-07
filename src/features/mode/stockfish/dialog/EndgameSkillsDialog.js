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
  TextField
} from '@mui/material';
import Pgn from 'common/Pgn';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';
import ColorButtonGroup from 'features/ColorButtonGroup';

const EndgameSkillsDialog = () => {
  const state = useSelector(state => state.stockfishMode);

  const dispatch = useDispatch();

  const endgameTypes = ['P'];

  const [fields, setFields] = useState({
    color: 'rand',
    items: 'rand'
  });

  const handleCreateGame = () => {
    let color = fields.color === 'rand'
      ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : fields.color;
    let items = fields.items === 'rand'
      ? endgameTypes[Math.floor(Math.random() * endgameTypes.length)]
      : fields.items;
    let split = items.split(',');
    split.length === 2
      ? items = {
        [color]: split[0],
        [color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE]: split[1]
      }
      : items = {
        [color]: split[0]
      };
    multiAction.initGui(dispatch);
    dispatch(nav.setTraining());
    Ws.randomizer(color, items);
  };

  const handleTypeChange = (event: Event) => {
    setFields({
      color: fields.color,
      items: event.target.value
    });
  };

  return (
    <Dialog open={state.dialogs.endgameSkills.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Endgame skills
        <IconButton onClick={() => dispatch(stockfishMode.endgameSkillsDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          required
          fullWidth
          name="items"
          label="Endgame"
          variant="filled"
          defaultValue="rand"
          onChange={handleTypeChange}
          margin="dense"
        >
          <MenuItem key={0} value="rand">
            Random
          </MenuItem>
          <MenuItem key={1} value="P">
            Pawn endgame
          </MenuItem>
        </TextField>
        <Grid container justifyContent="center">
          <ColorButtonGroup props={fields} />
        </Grid>
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
}

export default EndgameSkillsDialog;
