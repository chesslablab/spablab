import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useDispatch, useSelector } from 'react-redux';
import { startBoard } from '../actions/boardActions';
import { open as openInviteFriendDialog } from '../actions/inviteFriendDialogActions';
import { analysis, quit } from '../actions/serverActions';

const PrimaryButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const buttons = () => {
    let items = [];

    items.push(
      <Button
        key={0}
        color="default"
        startIcon={<TuneIcon />}
        style={{textTransform: 'none'}}
        onClick={() => {
          dispatch(quit(state.server.ws)).then(() => {
              dispatch(analysis(state.server.ws)).then(() => {
                  dispatch(startBoard({ back: state.board.history.length - 1 }));
                });
            });
          }}
      >
        Analysis board
      </Button>
    );

    if (props.server) {
      items.push(
        <Button
          key={1}
          color="default"
          startIcon={<GroupAddIcon />}
          onClick={() => {
            dispatch(openInviteFriendDialog());
          }}
          style={{textTransform: 'none'}}
        >
          Invite a friend
        </Button>
      );
    }

    return items;
  }

  return (
    <ButtonGroup color="primary">
      {buttons()}
    </ButtonGroup>
  );
}

export default PrimaryButtons;
