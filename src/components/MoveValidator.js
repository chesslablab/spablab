import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { wsMssgHeuristicpicture, wsMssgPlayfen } from '../actions/serverActions';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import Movetext from '../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    marginTop: 10,
    maxHeight: 300,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  currentMove: {
    backgroundColor: '#ececec !important',
    fontWeight: 'bold !important'
  }
});

const MoveValidator = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.board.short_fen) {
      wsMssgPlayfen(state);
    }
  }, [state.board.short_fen]);

  const highlight = (n) => {
    if (n === state.board.history.length + state.history.back - 1) {
      return classes.currentMove;
    }

    return '';
  };

  const tableRows = () => {
    let rows = [];
    Movetext.toRows(state.board.movetext)
      .forEach((row, i) => {
        rows.push(
          <TableRow key={i}>
            <TableCell align="right">{i + 1}</TableCell>
            <TableCell align="right" className={highlight(((i + 1) * 2) - 1)}>
              {row.w}
            </TableCell>
            <TableCell align="right" className={highlight((i + 1) * 2)}>
              {row.b}
            </TableCell>
          </TableRow>
        );
    });

    return rows;
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader size="small" aria-label="Movetext">
          <TableBody>
            {tableRows()}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup size="small" variant="text" aria-label="small button group">
        <Button
          startIcon={<ContentCopyIcon />}
          onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
        >
          Copy
        </Button>
        <Button
          startIcon={<BarChartIcon />}
          onClick={() => {
            dispatch({ type: progressDialogActionTypes.OPEN });
            wsMssgHeuristicpicture(state);
          }}
        >
          Heuristic Pic
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MoveValidator;
