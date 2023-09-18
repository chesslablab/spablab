import { React, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from '@mui/icons-material/Email';
import InboxIcon from '@mui/icons-material/Inbox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Button, Menu, MenuItem } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';

const InboxMenu = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [anchorElInbox, setAnchorElInbox] = useState(null);

  const handleCloseInbox = () => {
    setAnchorElInbox(null);
  };

  const handleClickInbox = (event) => {
    setAnchorElInbox(event.currentTarget);
  };

  return (
    <>
      <Button
        id="Nav-inbox"
        sx={{ pl: 2, justifyContent: 'flex-start' }}
        variant={state.nav.name === navConst.INBOX ? "contained" : "text"}
        startIcon={<EmailIcon />}
        onClick={handleClickInbox}
      >
        Inbox
      </Button>
      <Menu
        anchorEl={anchorElInbox}
        open={Boolean(anchorElInbox)}
        onClose={handleCloseInbox}
      >
        <MenuItem
          id="Nav-inbox-MenuItem-inviteFriend"
          onClick={() => {
            dispatch(nav.createInboxCodeDialog({ open: true }));
            handleCloseInbox();
          }}
        >
          <ContactMailIcon size="small" />&nbsp;Create Inbox
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(nav.enterInboxCodeDialog({ open: true }));
            handleCloseInbox();
          }}
        >
          <InboxIcon size="small" />&nbsp;Read Inbox
        </MenuItem>
      </Menu>
    </>
  );
}

export default InboxMenu;
