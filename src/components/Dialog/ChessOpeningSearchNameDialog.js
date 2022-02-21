import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
  MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import ChessOpeningSearchAjaxLoader from "../AjaxLoader/ChessOpeningSearchAjaxLoader.js";
import { wsMssgStartLoadpgn, wsMssgQuit } from "../../actions/serverActions";
import chessOpeningSearchAjaxLoaderActionTypes from '../../constants/ajaxLoader/chessOpeningSearchAjaxLoaderActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../../constants/dialog/chessOpeningSearchNameDialogActionTypes';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const ChessOpeningSearchNameDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    wsMssgQuit(state).then(() => {
      wsMssgStartLoadpgn(state, movetext).then(() => {
        setOpenings([]);
        dispatch({ type: chessOpeningSearchNameDialogActionTypes.CLOSE });
      });
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setOpenings([]);
    dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.SHOW });
    fetch('https://pchess.net/api/opening', {
      method: 'POST',
      body: JSON.stringify({ name: event.target.elements.name.value })
    }).then(res => res.json())
      .then(res => {
        setOpenings(res);
        dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.HIDE });
      });
  }

  return (
    <Dialog open={state.openingSearchNameDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Name</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField fullWidth required name="name" label="Name" />
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => {
              setOpenings([]);
              dispatch({ type: chessOpeningSearchNameDialogActionTypes.CLOSE });
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <ChessOpeningSearchAjaxLoader />
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

export default ChessOpeningSearchNameDialog;
