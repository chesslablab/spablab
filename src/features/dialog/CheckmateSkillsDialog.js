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
import { setTraining } from '../../features/mainButtonsSlice';
import { closeCheckmateSkillsDialog } from '../../features/dialog/checkmateSkillsDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../ws/WsAction';

const CheckmateSkillsDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const checkmateTypes = ['QR,R', 'Q', 'R', 'BB', 'BN'];

  const [dialogData, setDialogData] = React.useState({
    color: 'rand',
    items: 'rand'
  });

  const handleCreateGame = () => {
    let color;
    let items;
    dialogData.color === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = dialogData.color;
    dialogData.items === 'rand'
      ? items = checkmateTypes[Math.floor(Math.random() * checkmateTypes.length)]
      : items = dialogData.items;
    let split = items.split(',');
    split.length === 2
      ? items = {
        [color]: split[0],
        [color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE]: split[1]
      }
      : items = {
        [color]: split[0]
      };
    dispatch(setTraining());
    dispatch(closeCheckmateSkillsDialog());
    WsAction.randomCheckmate(state, color, items);
  };

  const handleTypeChange = (event: Event) => {
    setDialogData({
      color: dialogData.color,
      items: event.target.value
    });
  };

  return (
    <Dialog open={state.checkmateSkillsDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Checkmate skills
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closeCheckmateSkillsDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          name="items"
          label="Select an endgame"
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

export default CheckmateSkillsDialog;
