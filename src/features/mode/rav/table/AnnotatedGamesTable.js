import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import * as panel from 'features/panel/panelSlice';
import multiAction from 'features/multiAction';
import * as progressDialog from 'features/progressDialogSlice';

const styles = {
  tableContainer: {
    mt: 1,
  },
  eventCell: {
    width: '20%',
  },
  yearCell: {
    width: '5%',
  },
  ecoCell: {
    width: '5%',
  },
  whiteCell: {
    width: '20%',
  },
  blackCell: {
    width: '20%',
  },
  eloCell: {
    width: '5%',
  },
  resultCell: {
    width: '10%',
  },
  actionCell: {
    width: '10%',
  },
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const AnnotatedGamesTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (item) => {
    multiAction.initGui(dispatch);
    dispatch(nav.setDatabase());
    dispatch(panel.gameMetadataTable({
      Event: item.Event,
      Site: item.Site,
      Date: item.Date,
      White: item.White,
      Black: item.Black,
      'White ELO': item.WhiteElo,
      'Black ELO': item.BlackElo,
      Result: item.Result,
      ECO: item.ECO
    }));
    dispatch(progressDialog.open());
    fetch(`https://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/play/rav`, {
      method: 'POST',
      body: JSON.stringify({
        variant: variantConst.CLASSICAL,
        movetext: item.movetext
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(board.startPgn(res));
      dispatch(ravMode.set(res));
    })
    .catch(error => {
      dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
    })
    .finally(() => {
      dispatch(progressDialog.close());
    });
  };

  return (
    <TableContainer
      sx={styles.tableContainer}
      component={Paper}
    >
      <Table stickyHeader aria-label="simple table">
        {
          state.ravMode.tables.annotatedGames.length > 0
            ? <TableHead>
                <TableRow>
                  <TableCell sx={styles.eventCell} align="left">Event</TableCell>
                  <TableCell sx={styles.yearCell} align="left">Year</TableCell>
                  <TableCell sx={styles.ecoCell} align="left">ECO</TableCell>
                  <TableCell sx={styles.whiteCell} align="left">White</TableCell>
                  <TableCell sx={styles.eloCell} align="left">ELO</TableCell>
                  <TableCell sx={styles.blackCell} align="left">Black</TableCell>
                  <TableCell sx={styles.eloCell} align="left">ELO</TableCell>
                  <TableCell sx={styles.resultCell} align="left">Result</TableCell>
                </TableRow>
              </TableHead>
            : null
        }
        <TableBody>
          {
            state.ravMode.tables.annotatedGames.map((item, i) => (
              <TableRow
                key={i}
                hover={true}
                sx={styles.clickable}
                onClick={() => handleLoad(item)}
              >
                <TableCell sx={styles.eventCell} align="left">{item.Event}</TableCell>
                <TableCell sx={styles.yearCell} align="left">{parseInt(item.Date)}</TableCell>
                <TableCell sx={styles.ecoCell} align="left">{item.ECO}</TableCell>
                <TableCell sx={styles.whiteCell} align="left">{item.White}</TableCell>
                <TableCell sx={styles.eloCell} align="left">{item.WhiteElo}</TableCell>
                <TableCell sx={styles.blackCell} align="left">{item.Black}</TableCell>
                <TableCell sx={styles.eloCell} align="left">{item.BlackElo}</TableCell>
                <TableCell sx={styles.resultCell} align="left">{item.Result}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AnnotatedGamesTable;
