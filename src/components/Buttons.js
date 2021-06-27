import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { analysis, connect, quit } from '../actions/serverActions';
import { startBoard, flipBoard } from '../actions/boardActions';

const Buttons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const buttons = () => {
    let items = [];

    if (props.server) {
        items.push(<Button
          key={0}
          disabled={state.server.ws && state.server.ws.readyState === WebSocket.OPEN}
          onClick={() => {
            dispatch(startBoard({ back: state.board.history.length - 1 }));
            dispatch(connect(state.server.ws, props.server.host, props.server.port)).catch(e => {});
          }}>
          Connect
        </Button>);
    }

    items.push(<Button
      key={1}
      onClick={() => {
        dispatch(startBoard({ back: state.board.history.length - 1 }));
        if (state.server.ws) {
          dispatch(quit(state.server.ws)).then(() => dispatch(analysis(state.server.ws)))
        }
      }}>Analysis board
    </Button>);

    items.push(<Button
      key={2}
      color="primary"
      onClick={() => dispatch(flipBoard())}>Flip
    </Button>);

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
