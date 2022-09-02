import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as databaseDialog from '../../features/dialog/databaseDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as gameTable from '../../features/table/gameTableSlice';
import WsAction from '../../ws/WsAction';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 10,
  },
  row: {
    '& th': {
      fontSize: '0.87em',
    },
    '& td': {
      fontSize: '0.87em',
    }
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
});

const DatabaseResultTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (item) => {
    dispatch(databaseDialog.close());
    dispatch(progressDialog.open());
    dispatch(mainButtons.setDatabase());
    Dispatcher.initGui(dispatch);
    WsAction.startPgn(state, item.movetext);
    dispatch(gameTable.show({
      game: {
        Event: item.Event,
        Site: item.Site,
        Date: item.Date,
        White: item.White,
        Black: item.Black,
        'White ELO': item.WhiteElo,
        'Black ELO': item.BlackElo,
        Result: item.Result,
        ECO: item.ECO
      }
    }));
  };

  return (
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
    >
      <Table stickyHeader aria-label="simple table">
        {
          props.result.length > 0
            ? <TableHead>
                <TableRow className={classes.row}>
                  <TableCell className={classes.eventCell} align="left">Event</TableCell>
                  <TableCell className={classes.yearCell} align="left">Year</TableCell>
                  <TableCell className={classes.ecoCell} align="left">ECO</TableCell>
                  <TableCell className={classes.whiteCell} align="left">White</TableCell>
                  <TableCell className={classes.eloCell} align="left">ELO</TableCell>
                  <TableCell className={classes.blackCell} align="left">Black</TableCell>
                  <TableCell className={classes.eloCell} align="left">ELO</TableCell>
                  <TableCell className={classes.resultCell} align="left">Result</TableCell>
                  <TableCell className={classes.eventCell}></TableCell>
                </TableRow>
              </TableHead>
            : null
        }
        <TableBody>
          {
            props.result.map((item, i) => (
              <TableRow key={i} className={classes.row}>
                <TableCell className={classes.eventCell} align="left">{item.Event}</TableCell>
                <TableCell className={classes.yearCell} align="left">{parseInt(item.Date)}</TableCell>
                <TableCell className={classes.ecoCell} align="left">{item.ECO}</TableCell>
                <TableCell className={classes.whiteCell} align="left">{item.White}</TableCell>
                <TableCell className={classes.eloCell} align="left">{item.WhiteElo}</TableCell>
                <TableCell className={classes.blackCell} align="left">{item.Black}</TableCell>
                <TableCell className={classes.eloCell} align="left">{item.BlackElo}</TableCell>
                <TableCell className={classes.resultCell} align="left">{item.Result}</TableCell>
                <TableCell className={classes.eventCell}>
                  <IconButton
                    aria-label="load"
                    color="primary"
                    onClick={() => handleLoad(item)}
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

export default DatabaseResultTable;
