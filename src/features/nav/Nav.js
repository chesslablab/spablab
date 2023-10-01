import { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ButtonGroup, useMediaQuery } from '@mui/material';
import Wording from 'common/Wording';
import AnalysisMenu from 'features/nav/AnalysisMenu';
import PlayMenu from 'features/nav/PlayMenu';
import OpeningsMenu from 'features/nav/OpeningsMenu';
import DatabaseMenu from 'features/nav/DatabaseMenu';
import TrainingMenu from 'features/nav/TrainingMenu';
import InboxMenu from './InboxMenu';
import SettingsMenu from './SettingsMenu';

const Nav = () => {
  const state = useSelector(state => state);

  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };

  const [hamburgerMenuOpen, setHamburgerMenu] = useState(false)

  const handleHamburgerClick = () => {
    setHamburgerMenu(!hamburgerMenuOpen);
  }

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
        <AnalysisMenu />
        <PlayMenu />
        <DatabaseMenu />
        <OpeningsMenu />
        <TrainingMenu />
        <InboxMenu />
        <SettingsMenu />
      </ButtonGroup>
    </>
  );
}

export default Nav;
