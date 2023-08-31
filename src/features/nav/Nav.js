import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmailIcon from '@mui/icons-material/Email';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ButtonGroup, Menu, MenuItem, useMediaQuery } from '@mui/material';
import Wording from 'common/Wording';
import AnalysisBoard from 'features/nav/AnalysisBoard';
import Play from 'features/nav/Play';
import OpeningSearch from 'features/nav/OpeningSearch';
import Database from 'features/nav/Database';
import Training from 'features/nav/Training';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';

const Nav = () => {
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  const maxWidth = {
    '900': useMediaQuery("(max-width:900px)"),
  };

  const [anchorElInbox, setAnchorElInbox] = useState(null);

  const [hamburgerMenuOpen, setHamburgerMenu] = useState(false)

  const handleHamburgerClick = () => {
    setHamburgerMenu(!hamburgerMenuOpen);
  }

  const handleCloseInbox = () => {
    setAnchorElInbox(null);
  };
  
  const handleClickInbox = (event) => {
    setAnchorElInbox(event.currentTarget);
  };

  const disabled = state.playMode.active &&
    state.playMode.accepted &&
    (!state.playMode.draw || state.playMode.draw === Wording.verb.PROPOSE.toLowerCase()) &&
    !state.playMode.resign &&
    !state.playMode.leave &&
    !state.playMode.timeOut &&
    !state.board.isMate &&
    !state.board.isStalemate;

  return (
    <>
      <Button sx={{ display: `${maxWidth['900'] ? "block" : "none"}` }}
        onClick={handleHamburgerClick} > {hamburgerMenuOpen ? <CloseIcon sx={{fontSize: 40}} /> : <MenuIcon sx={{fontSize: 40}} />}
      </Button>
      <ButtonGroup
        orientation={maxWidth['900'] ? "vertical" : "horizontal"}
        variant="text"
        aria-label="Main Menu"
        fullWidth={true}
        disabled={disabled}
        sx={{
          borderTop: "1px solid #1976d280",
          borderBottom: "1px solid #1976d280",
          borderRadius: 0,
          display: `${maxWidth['900'] ? (hamburgerMenuOpen ? "flex" : "none") : "flex"}`
        }}
      >
        <AnalysisBoard />
        <Play />
        <OpeningSearch />
        <Database />
        <Training />
        <Button
          id="Nav-inbox"
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
        <Button
          id="Nav-settings"
          sx={{ borderRadius: 0 }}
          variant={state.nav.name === navConst.SETTINGS ? "contained" : "text"}
          startIcon={<SettingsIcon />}
          onClick={() => dispatch(nav.settingsDialog({ open: true }))}
        >
          Settings
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Nav;