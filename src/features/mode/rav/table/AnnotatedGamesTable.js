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
  roundCell: {
    width: '10%',
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
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const AnnotatedGamesTable = () => {
  const state = useSelector(state => state.ravMode);

  const dispatch = useDispatch();

  const handleLoad = (item) => {
    multiAction.initGui(dispatch);
    dispatch(nav.setDatabase());
    dispatch(panel.movesMetadataTable({
      Event: item.Event,
      Round: item.Round,
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
    fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/play/rav`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${process.env.REACT_APP_CHESS_API_KEY}`
      },
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
          state.tables.annotatedGames.length > 0
            ? <TableHead>
                <TableRow>
                  <TableCell sx={styles.eventCell} align="left">Event</TableCell>
                  <TableCell sx={styles.roundCell} align="left">Round</TableCell>
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
            state.tables.annotatedGames.map((item, i) => (
              <TableRow
                key={i}
                hover={true}
                sx={styles.clickable}
                onClick={() => handleLoad(item)}
              >
                <TableCell sx={styles.eventCell} align="left">{item.Event}</TableCell>
                <TableCell sx={styles.roundCell} align="left">{item.Round}</TableCell>
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
