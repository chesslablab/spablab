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
import * as endgameSkillsDialog from '../../features/dialog/endgameSkillsDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../features/ws/WsAction';

const EndgameSkillsDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const endgameTypes = ['P'];

  const [fields, setFields] = React.useState({
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
    dispatch(mainButtons.setTraining());
    dispatch(endgameSkillsDialog.close());
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
    <Dialog open={state.endgameSkillsDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Endgame skills
        <IconButton onClick={() => dispatch(endgameSkillsDialog.close())}>
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
          margin="normal"
          onChange={handleTypeChange}
        >
          <MenuItem key={0} value="rand">
            Random
          </MenuItem>
          <MenuItem key={1} value="P">
            Pawn endgame
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

export default EndgameSkillsDialog;
