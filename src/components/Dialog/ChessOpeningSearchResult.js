import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { wsMssgQuit, wsMssgStartLoadpgn } from '../../actions/serverActions';
import progressDialogActionTypes from '../../constants/dialog/progressDialogActionTypes';
import chessOpeningSearchEcoDialogActionTypes from '../../constants/dialog/chessOpeningSearchEcoDialogActionTypes';
import chessOpeningSearchMovetextDialogActionTypes from '../../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../../constants/dialog/chessOpeningSearchNameDialogActionTypes';

const ChessOpeningSearchResult = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch({ type: chessOpeningSearchEcoDialogActionTypes.CLOSE });
    dispatch({ type: chessOpeningSearchMovetextDialogActionTypes.CLOSE });
    dispatch({ type: chessOpeningSearchNameDialogActionTypes.CLOSE });
    dispatch({ type: progressDialogActionTypes.OPEN });
    wsMssgQuit(state).then(() => wsMssgStartLoadpgn(state, movetext));
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {
            props.openings.map((item, i) => (
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
  );
}

export default ChessOpeningSearchResult;
