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
  TextField
} from '@mui/material';
import Pgn from '../../common/Pgn';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as checkmateSkillsDialog from '../../features/dialog/checkmateSkillsDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../features/ws/WsAction';

const CheckmateSkillsDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const checkmateTypes = ['QR,R', 'Q', 'R', 'BB', 'BN'];

  const [fields, setFields] = React.useState({
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
    dispatch(mainButtons.setTraining());
    dispatch(checkmateSkillsDialog.close());
    Dispatcher.initGui(dispatch);
    WsAction.randomizer(state, color, items);
  };

  const handleTypeChange = (event: Event) => {
    setFields({
      color: fields.color,
      items: event.target.value
    });
  };

  return (
    <Dialog open={state.checkmateSkillsDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Checkmate skills
        <IconButton onClick={() => dispatch(checkmateSkillsDialog.close())}>
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
          margin="normal"
          onChange={handleTypeChange}
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
          <SelectColorButtons props={fields} />
        </Grid>
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

export default CheckmateSkillsDialog;
