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

const SearchNameDialog = () => {
  const state = useSelector(state => state);

  const [openings, setOpenings] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byName(event.target.elements.name.value);
    setOpenings(openings);
    if (openings.length === 0) {
      dispatch(sanMode.searchNameDialog({ open: false }));
      dispatch(infoAlert.show({ mssg: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog open={state.sanMode.dialogs.searchName.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Name
        <IconButton onClick={() => {
          setOpenings([]);
          dispatch(sanMode.searchNameDialog({ open: false }));
        }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSearch}>
          <TextField
            id="SearchNameDialog-TextField-name"
            fullWidth
            required
            name="name"
            label="Name"
            variant="filled"
            margin="dense"
          />
          <Button sx={{ mt: 2 }}
            id="SearchNameDialog-Button-search"
            fullWidth
            size="large"
            variant="contained"
            type="submit"
          >
            Search
          </Button>
        </form>
        <OpeningSearchResultTable props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default SearchNameDialog;
