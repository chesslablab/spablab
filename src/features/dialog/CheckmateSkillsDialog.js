import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
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

  const checkmateTypes = ['Q', 'R', 'BB', 'BN'];

  const [dialogData, setDialogData] = React.useState({
    type: 'rand',
    color: 'rand'
  });

  const handleCreateGame = () => {
    let checkmateType;
    let color;
    dialogData.type === 'rand'
      ? checkmateType = checkmateTypes[Math.floor(Math.random() * checkmateTypes.length)]
      : checkmateType = dialogData.type;
    dialogData.color === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = dialogData.color;
    dispatch(setTraining());
    dispatch(closeCheckmateSkillsDialog());
    WsAction.randomCheckmate(state, color, checkmateType);
  }

  const handleTypeChange = (event: Event, type) => {
    setDialogData({
      type: type.props.value,
      color: dialogData.color
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
          name="type"
          label="Select an endgame"
          defaultValue="rand"
          margin="normal"
          onChange={handleTypeChange}
        >
          <MenuItem key={0} value="rand">
            Random
          </MenuItem>
          <MenuItem key={1} value="Q">
            King and queen vs. king
          </MenuItem>
          <MenuItem key={2} value="R">
            King and rook vs. king
          </MenuItem>
          <MenuItem key={3} value="BB">
            King and two bishops vs. king
          </MenuItem>
          <MenuItem key={4} value="BN">
            King and bishop and knight vs. king
          </MenuItem>
        </TextField>
        <Grid container justifyContent="center">
          <SelectColorButtons props={dialogData} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCreateGame()}
        >
          Create Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CheckmateSkillsDialog;
