import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material';
import { Opening } from '@chesslablab/reactblab';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as sanMode from 'features/mode/sanModeSlice';
import OpeningSearchResultTable from 'features/mode/san/table/OpeningSearchResultTable.js';
import styles from 'styles/dialog';

const SearchMovetextDialog = () => {
  const state = useSelector(state => state.sanMode);

  const dispatch = useDispatch();

  const [openings, setOpenings] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byMovetext(event.target.elements.movetext.value);
    setOpenings(openings);
    if (!openings) {
      dispatch(sanMode.searchMovetextDialog({ open: false }));
      dispatch(infoAlert.show({ msg: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.searchMovetext.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        SAN Movetext
        <IconButton onClick={() => {
          setOpenings([]);
          dispatch(sanMode.searchMovetextDialog({ open: false }));
        }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            required
            name="movetext"
            label="Movetext"
            variant="filled"
            margin="dense"
          />
          <Button sx={{ mt: 2 }}
            fullWidth
            size="large"
            variant="contained"
            type="submit"
          >
            Search
          </Button>
        </form>
        { openings ? <OpeningSearchResultTable props={{ openings: openings }} /> : null }
      </DialogContent>
    </Dialog>
  );
}

export default SearchMovetextDialog;
