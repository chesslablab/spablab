import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem,
  Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';
import openingSearchEcoDialogActions from '../../constants/openingSearchEcoDialogActionTypes';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const OpeningSearchEcoDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    fetch('https://pchess.net/api/opening', {
      method: 'POST',
      body: JSON.stringify({ eco: event.target.elements.code.value })
    }).then(res => res.json())
      .then(res => setOpenings(res));
  }

  return (
    <Dialog open={state.openingSearchEcoDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>ECO Code</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField
            select
            fullWidth
            required
            name="code"
            label="Code"
            defaultValue="A"
          >
            <MenuItem key={0} value="A">
              A: Flank Openings
            </MenuItem>
            <MenuItem key={1} value="B">
              B: Semi-Open Games other than the French Defense
            </MenuItem>
            <MenuItem key={2} value="C">
              C: Open Games and the French Defense
            </MenuItem>
            <MenuItem key={3} value="D">
              D: Closed Games and Semi-Closed Games
            </MenuItem>
            <MenuItem key={4} value="E">
              E: Indian Defenses
            </MenuItem>
          </TextField>
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => {
              setOpenings([]);
              dispatch({ type: openingSearchEcoDialogActions.CLOSE });
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableBody>
              {
                openings.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">{item.eco}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.movetext}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default OpeningSearchEcoDialog;
