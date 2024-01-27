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
  TextField
} from '@mui/material';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';
import ColorButtonGroup from 'features/ColorButtonGroup';
import styles from 'styles/dialog';

const CheckmateSkillsDialog = () => {
  const state = useSelector(state => state.stockfishMode);

  const dispatch = useDispatch();

  const checkmateTypes = ['QR,R', 'Q', 'R', 'BB', 'BN'];

  const [fields, setFields] = useState({
    color: 'rand',
    items: 'rand'
  });

  const handleCreateGame = () => {
    let color = fields.color === 'rand'
      ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : fields.color;
    let items = fields.items === 'rand'
      ? checkmateTypes[Math.floor(Math.random() * checkmateTypes.length)]
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
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.checkmateSkills.open}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        Checkmate skills
        <IconButton onClick={() => dispatch(stockfishMode.checkmateSkillsDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          required
          fullWidth
          name="items"
          label="Checkmate"
          variant="filled"
          defaultValue="rand"
          onChange={handleTypeChange}
          margin="dense"
        >
          <MenuItem key={0} value="rand">
            Random
          </MenuItem>
          <MenuItem key={1} value="QR,R">
            King and queen and rook vs. king and rook
          </MenuItem>
          <MenuItem key={2} value="Q">
            King and queen vs. king
          </MenuItem>
          <MenuItem key={3} value="R">
            King and rook vs. king
          </MenuItem>
          <MenuItem key={4} value="BB">
            King and two bishops vs. king
          </MenuItem>
          <MenuItem key={5} value="BN">
            King and bishop and knight vs. king
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

export default CheckmateSkillsDialog;
