import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
  MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';
import ChessOpeningSearchEcoAjaxLoader from "../AjaxLoader/ChessOpeningSearchEcoAjaxLoader.js";
import PublishIcon from '@mui/icons-material/Publish';
import { wsMssgStartLoadpgn, wsMssgQuit } from "../../actions/serverActions";
import chessOpeningSearchEcoAjaxLoaderActionTypes from '../../constants/ajaxLoader/chessOpeningSearchEcoAjaxLoaderActionTypes';
import openingSearchEcoDialogActionTypes from '../../constants/openingSearchEcoDialogActionTypes';


const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const ChessOpeningSearchEcoDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    wsMssgQuit(state).then(() => {
      wsMssgStartLoadpgn(state, movetext).then(() => {
        dispatch({ type: openingSearchEcoDialogActionTypes.CLOSE });
      });
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setOpenings([]);
    dispatch({ type: chessOpeningSearchEcoAjaxLoaderActionTypes.SHOW });
    fetch('https://pchess.net/api/opening', {
      method: 'POST',
      body: JSON.stringify({ eco: event.target.value })
    }).then(res => res.json())
      .then(res => {
        setOpenings(res);
        dispatch({ type: chessOpeningSearchEcoAjaxLoaderActionTypes.HIDE });
      });
  }

  return (
    <Dialog open={state.openingSearchEcoDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>ECO Code</DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          <TextField
            select
            fullWidth
            required
            name="code"
            label="Select an option"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
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
            <Button onClick={() => {
              setOpenings([]);
              dispatch({ type: openingSearchEcoDialogActionTypes.CLOSE });
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <ChessOpeningSearchEcoAjaxLoader />
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableBody>
              {
                openings.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">{item.eco}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.movetext}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="load"
                        color="primary"
                        onClick={() => handleLoad(item.movetext)}
                      >
                        <PublishIcon />
                      </IconButton>
                    </TableCell>
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

export default ChessOpeningSearchEcoDialog;
