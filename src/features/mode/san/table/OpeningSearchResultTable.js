import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const styles = {
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const OpeningSearchResultTable = ({props}) => {
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    multiAction.initGui(dispatch);
    dispatch(nav.setOpeningSearch());
    const settings = {
      movetext: movetext
    };
    Ws.start(
      variantConst.CLASSICAL,
      modeConst.SAN,
      { settings: JSON.stringify(settings) }
    );
  };

  if (props.openings.length > 0) {
    return (
      <TableContainer sx={{ mt: 2.5 }} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableBody>
            {
              props.openings.map((item, i) => (
                <TableRow
                  id={"OpeningSearchResultTable-TableRow-"+i}
                  key={i}
                  hover={true}
                  sx={styles.clickable}
                  onClick={() => handleLoad(item.movetext)}
                >
                  <TableCell align="right">{item.eco}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.movetext}</TableCell>
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

export default OpeningSearchResultTable;
