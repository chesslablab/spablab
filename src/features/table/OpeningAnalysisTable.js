import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { openProgressDialog } from '../../features/dialog/progressDialogSlice';
import { closeOpeningAnalysisTable } from '../../features/table/openingAnalysisTableSlice';
import WsAction from '../../ws/WsAction';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15,
    maxHeight: 200,
    overflowY: 'scroll',
  },
});

const OpeningAnalysisTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch(closeOpeningAnalysisTable());
    dispatch(openProgressDialog());
    WsAction.quit(state).then(() => WsAction.startLoadpgn(state, movetext));
  };

  if (state.openingAnalysisTable.open) {
    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader size="small" aria-label="Chess Openings">
          <TableBody>
            {
              state.openingAnalysisTable.rows.map((item, i) => (
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

export default OpeningAnalysisTable;
