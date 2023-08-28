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
import Opening from 'common/Opening.js';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as sanMode from 'features/mode/sanModeSlice';
import OpeningSearchResultTable from 'features/mode/san/table/OpeningSearchResultTable.js';

const SearchMovetextDialog = () => {
  const state = useSelector(state => state);

  const [openings, setOpenings] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byMovetext(event.target.elements.movetext.value);
    setOpenings(openings);
    if (!openings) {
      dispatch(sanMode.searchMovetextDialog({ open: false }));
      dispatch(infoAlert.show({ mssg: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog open={state.sanMode.dialogs.searchMovetext.open} maxWidth="sm" fullWidth={true}>
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
