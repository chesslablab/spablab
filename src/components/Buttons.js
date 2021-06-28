import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import TuneIcon from '@material-ui/icons/Tune';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { useDispatch, useSelector } from 'react-redux';
import { analysis, connect, quit } from '../actions/serverActions';
import { startBoard, flipBoard } from '../actions/boardActions';

const Buttons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const buttons = () => {
    let items = [];

    if (props.server) {
        items.push(
          <Button
            key={0}
            color="default"
            startIcon={<CloudIcon />}
            disabled={state.server.ws && state.server.ws.readyState === WebSocket.OPEN}
            onClick={() => {
              dispatch(startBoard({ back: state.board.history.length - 1 }));
              dispatch(connect(state.server.ws, props.server.host, props.server.port)).catch(e => {});
            }}
            style={{textTransform: 'none'}}
          >
            Connect
        </Button>
      );
    }

    items.push(
      <Button
        key={1}
        color="default"
        startIcon={<TuneIcon />}
        onClick={() => {
          dispatch(startBoard({ back: state.board.history.length - 1 }));
          if (state.server.ws) {
            dispatch(quit(state.server.ws)).then(() => dispatch(analysis(state.server.ws)))
          }
        }}
        style={{textTransform: 'none'}}
      >
        Analysis
      </Button>
    );

    items.push(
      <Button
        key={2}
        color="default"
        startIcon={<SwapVertIcon />}
        onClick={() => dispatch(flipBoard())}
        style={{textTransform: 'none'}}
      >
        Flip
      </Button>
    );

    return items;
  }

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      style={{justifyContent: 'center'}}
    >
      {buttons()}
    </ButtonGroup>
  );
}

export default Buttons;
