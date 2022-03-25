import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { wsMssgQuit, wsMssgStartLoadpgn } from '../../actions/serverActions';
import progressDialogActionTypes from '../../constants/dialog/progressDialogActionTypes';
import chessOpeningAnalysisTableActionTypes from '../../constants/table/chessOpeningAnalysisTableActionTypes';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15,
    maxHeight: 200,
    overflowY: 'scroll',
  },
});

const ChessOpeningAnalysisTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch({ type: chessOpeningAnalysisTableActionTypes.CLOSE });
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
