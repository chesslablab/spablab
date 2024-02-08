import { useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import * as modeConst from 'features/mode/modeConst';
import * as panel from 'features/panel/panelSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import multiAction from 'features/multiAction';
import Ws from 'socket/Ws';

const styles = {
  tableContainer: {
    mt: 2,
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

const SearchGamesTable = ({ props }) => {
  const dispatch = useDispatch();

  const handleLoad = (item) => {
    multiAction.initGui(dispatch);
    dispatch(nav.setDatabase());
    dispatch(panel.movesMetadataTable({
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
    const settings = {
      movetext: item.movetext
    };
    Ws.start(
      variantConst.CLASSICAL,
      modeConst.SAN,
      { settings: JSON.stringify(settings) }
    );
  };

  if (props.result.length > 0) {
    return (
      <TableContainer
        sx={styles.tableContainer}
        component={Paper}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
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
          <TableBody>
            {
              props.result.map((item, i) => (
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

  return null;
}

export default SearchGamesTable;
