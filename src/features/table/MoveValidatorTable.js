import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Movetext from '../../common/Movetext.js';
import { goTo } from '../../features/historySlice';
import WsAction from '../../ws/WsAction';

const useStyles = makeStyles({
  table: {
    maxHeight: 170,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  move: {
    "&:hover": {
      color: "#ffffff",
      background: "#3d8cd9 !important",
      cursor: 'pointer'
    },
  },
  currentMove: {
    color: "#ffffff !important",
    background: "#1976d2 !important",
    fontWeight: 'bold !important'
  }
});

const MoveValidatorTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.board.shortFen) {
      WsAction.playFen(state);
    }
  }, [state.board.shortFen]);

  const highlight = (n) => {
    if (n === state.board.history.length + state.history.back - 1) {
      return classes.currentMove;
    }

    return '';
  };

  const tableRows = () => {
    return Movetext.toRows(state.board.movetext)
      .map((row, i) => (
        <TableRow key={i}>
          <TableCell align="left">{i + 1}</TableCell>
          <TableCell
            align="left"
            className={[classes.move, highlight(((i + 1) * 2) - 1)].join(' ')}
            onClick={() => dispatch(goTo({
              back: state.board.history.length - 1 - (((i + 1) * 2) - 1) }
            ))}
          >
            {row.w}
          </TableCell>
          <TableCell
            align="left"
            className={[classes.move, highlight((i + 1) * 2)].join(' ')}
            onClick={() => {
              const back = state.board.history.length - 1 - ((i + 1) * 2);
              if (back >= 0) {
                dispatch(goTo({ back: back }));
              }
            }}
          >
            {row.b}
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <Slide direction="down" in={state.board.movetext ? true : false} mountOnEnter unmountOnExit>
      <TableContainer className={classes.table}>
        <Table stickyHeader size="small" aria-label="Movetext">
          <TableBody>
            {tableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Slide>
  );
}

export default MoveValidatorTable;
