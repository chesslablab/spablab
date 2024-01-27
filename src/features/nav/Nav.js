import { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ButtonGroup, useMediaQuery } from '@mui/material';
import * as actionConst from 'features/mode/actionConst';
import ChessboardMenu from 'features/nav/ChessboardMenu';
import PlayMenu from 'features/nav/PlayMenu';
import OpeningsMenu from 'features/nav/OpeningsMenu';
import DatabaseMenu from 'features/nav/DatabaseMenu';
import TrainingMenu from 'features/nav/TrainingMenu';
import InboxMenu from './InboxMenu';
import SettingsMenu from './SettingsMenu';
import HelpMenu from './HelpMenu';

const Nav = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };

  const [hamburgerMenuOpen, setHamburgerMenu] = useState(false)

  const handleHamburgerClick = () => {
    setHamburgerMenu(!hamburgerMenuOpen);
  }

  const disabled = statePlayMode.active &&
    statePlayMode.accepted &&
    (!statePlayMode.draw || statePlayMode.draw === actionConst.PROPOSE) &&
    !statePlayMode.resign &&
    !statePlayMode.leave &&
    !statePlayMode.timeOut &&
    !stateBoard.isMate &&
    !stateBoard.isStalemate;

  return (
    <>
      <Button sx={{ display: `${maxWidth['900'] ? "block" : "none"}` }}
        onClick={handleHamburgerClick} > {hamburgerMenuOpen ? <CloseIcon sx={{ fontSize: 40 }} /> : <MenuIcon sx={{ fontSize: 40 }} />}
      </Button>
      <ButtonGroup
        orientation={maxWidth['900'] ? "vertical" : "horizontal"}
        variant="text"
        aria-label="Main Menu"
        fullWidth={true}
        disabled={disabled}
        sx={{
          display: `${maxWidth['900'] ? (hamburgerMenuOpen ? "flex" : "none") : "flex"}`,
          borderRadius: 0
        }}
      >
        <ChessboardMenu />
        <PlayMenu />
        <DatabaseMenu />
        <OpeningsMenu />
        <TrainingMenu />
        <InboxMenu />
        <SettingsMenu />
        <HelpMenu />
      </ButtonGroup>
    </>
  );
}

export default Nav;
