import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem,
  Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';
import openingSearchMovetextDialogActions from '../../constants/openingSearchMovetextDialogActionTypes';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const OpeningSearchMovetextDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    fetch('https://pchess.net/api/opening', {
      method: 'POST',
      body: JSON.stringify({ movetext: event.target.elements.movetext.value })
    }).then(res => res.json())
      .then(res => setOpenings(res));
  }

  return (
    <Dialog open={state.openingSearchMovetextDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Movetext</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField fullWidth required name="movetext" label="Movetext" />
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => {
              setOpenings([]);
              dispatch({ type: openingSearchMovetextDialogActions.CLOSE });
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

export default OpeningSearchMovetextDialog;
