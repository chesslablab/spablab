import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import * as ravMode from 'features/mode/ravModeSlice';
import AnnotatedGamesTable from 'features/mode/rav/table/AnnotatedGamesTable.js';

const AnnotatedGamesDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.ravMode.dialogs.annotatedGames.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Annotated Games
        <IconButton onClick={() => dispatch(ravMode.annotatedGamesDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Alert
          style={{ marginBottom: 15 }}
          className="info-alert"
          severity="info"
        >
          More annotated games will soon be available. Stay tuned!
        </Alert>
        <AnnotatedGamesTable />
      </DialogContent>
    </Dialog>
  );
};

export default AnnotatedGamesDialog;
