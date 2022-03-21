import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { wsMssgQuit, wsMssgStartLoadpgn } from '../../actions/serverActions';
import chessOpeningSearchEcoDialogActionTypes from '../../constants/dialog/chessOpeningSearchEcoDialogActionTypes';
import chessOpeningSearchMovetextDialogActionTypes from '../../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../../constants/dialog/chessOpeningSearchNameDialogActionTypes';
import progressDialogActionTypes from '../../constants/dialog/progressDialogActionTypes';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 10,
    maxHeight: 300,
    overflowY: 'scroll',
  },
  line: {
    marginBottom: 10,
  },
});

const ChessOpeningAnalysisTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch({ type: chessOpeningSearchEcoDialogActionTypes.CLOSE });
    dispatch({ type: chessOpeningSearchMovetextDialogActionTypes.CLOSE });
    dispatch({ type: chessOpeningSearchNameDialogActionTypes.CLOSE });
    dispatch({ type: progressDialogActionTypes.OPEN });
    wsMssgQuit(state).then(() => wsMssgStartLoadpgn(state, movetext));
  };

  if (state.chessOpeningAnalysisTable.open) {
    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader size="small" aria-label="Chess Openings">
          <TableBody>
            {
              state.chessOpeningAnalysisTable.rows.map((item, i) => (
                <TableRow key={i}>
                  <TableCell align="right">{item.eco}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
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
    );
  }

  return null;
}

export default ChessOpeningAnalysisTable;
