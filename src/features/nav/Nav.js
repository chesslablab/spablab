import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmailIcon from '@mui/icons-material/Email';
import ExtensionIcon from '@mui/icons-material/Extension';
import GradientIcon from '@mui/icons-material/Gradient';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import TuneIcon from '@mui/icons-material/Tune';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Button, ButtonGroup, Divider, Menu, MenuItem, useMediaQuery } from '@mui/material';
import Pgn from 'common/Pgn';
import Wording from 'common/Wording';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';
import * as progressDialog from 'features/progressDialogSlice';

const Nav = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);
  const [anchorElPlay, setAnchorElPlay] = useState(null);
  const [anchorElDatabase, setAnchorElDatabase] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);
  const [anchorElCorrespondence, setAnchorElCorrespondence] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const handleCloseAnalysis = () => {
    setAnchorElAnalysis(null);
  };

  const handleClosePlay = () => {
    setAnchorElPlay(null);
  };

  const handleCloseDatabase = () => {
    setAnchorElDatabase(null);
  };

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleCloseOpeningSearch = () => {
    setAnchorElOpeningSearch(null);
  };

  const handleCloseCorrespondence = () => {
    setAnchorElCorrespondence(null);
  };

  const handleClickAnalysis = (event) => {
    setAnchorElAnalysis(event.currentTarget);
  };

  const handleClickPlay = (event) => {
    setAnchorElPlay(event.currentTarget);
  };

  const handleClickDatabase = (event) => {
    setAnchorElDatabase(event.currentTarget);
  };

  const handleClickTraining = (event) => {
    setAnchorElTraining(event.currentTarget);
  };

  const handleClickOpeningSearch = (event) => {
    setAnchorElOpeningSearch(event.currentTarget);
  };

  const handleClickCorrespondence = (event) => {
    setAnchorElCorrespondence(event.currentTarget);
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
    <ButtonGroup
      orientation={matches ? "horizontal" : "vertical"}
      variant="text"
      aria-label="Main Menu"
      fullWidth={true}
      disabled={disabled}
      sx={{ borderTop: "1px solid #1976d280", borderBottom: "1px solid #1976d280", borderRadius: 0 }}
    >
      <Button
        id="Nav-analysisBoard"
        sx={{ borderRadius: 0 }}
        variant={state.nav.name === navConst.ANALYSIS ? "contained" : "text"}
        startIcon={<TuneIcon />}
        onClick={handleClickAnalysis}
      >
        Analysis Board
      </Button>
      <Menu
        anchorEl={anchorElAnalysis}
        open={Boolean(anchorElAnalysis)}
        onClose={handleCloseAnalysis}
      >
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startClassical"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            Ws.start(variantConst.CLASSICAL, modeConst.FEN);
          }}
        >
          <RestartAltIcon size="small" />&nbsp;Start Classical
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startFischerRandom960"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            Ws.start(variantConst.CHESS_960, modeConst.FEN);
          }}
        >
          <ShuffleIcon size="small" />&nbsp;Start Fischer Random 960
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startCapablanca"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            Ws.start(variantConst.CAPABLANCA, modeConst.FEN);
          }}
        >
          <BlurOnIcon size="small" />&nbsp;Start Capablanca
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-analysisBoard-MenuItem-pgnMovetext"
          onClick={() => {
            dispatch(pgnMode.loadPgnDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-fenString"
          onClick={() => {
            dispatch(fenMode.loadFenDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <WidgetsIcon size="small" />&nbsp;FEN String
        </MenuItem>
      </Menu>
      <Button
        id="Nav-play"
        variant={state.nav.name === navConst.PLAY ? "contained" : "text"}
        startIcon={<GradientIcon />}
        onClick={handleClickPlay}
      >
        Play
      </Button>
      <Menu
        anchorEl={anchorElPlay}
        open={Boolean(anchorElPlay)}
        onClose={handleClosePlay}
      >
        <MenuItem
          id="Nav-play-MenuItem-computer"
          onClick={() => {
            dispatch(stockfishMode.playComputerDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <SmartToyIcon size="small" />&nbsp;Play Computer
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-play-MenuItem-friend"
          onClick={() => {
            dispatch(playMode.set({ play: {} }));
            dispatch(playMode.createInviteCodeDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <PersonIcon size="small" />&nbsp;Play a Friend
        </MenuItem>
        <MenuItem
          id="Nav-play-MenuItem-enter-invite-code"
          onClick={() => {
            dispatch(playMode.enterInviteCodeDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <KeyboardIcon size="small" />&nbsp;Enter Invite Code
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-play-MenuItem-online"
          onClick={() => {
            Ws.onlineGames();
            dispatch(playMode.playOnlineDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <LanguageIcon size="small" />&nbsp;Play Online
        </MenuItem>
      </Menu>
      <Button
        id="Nav-openingSearch"
        variant={state.nav.name === navConst.OPENING_SEARCH ? "contained" : "text"}
        startIcon={<SearchIcon />}
        onClick={handleClickOpeningSearch}
      >
        Opening Search
      </Button>
      <Menu
        anchorEl={anchorElOpeningSearch}
        open={Boolean(anchorElOpeningSearch)}
        onClose={handleCloseOpeningSearch}
      >
        <MenuItem
          id="Nav-openingSearch-MenuItem-ecoCode"
          onClick={() => {
            dispatch(pgnMode.searchEcoDialog({ open: true }));
            handleCloseOpeningSearch();
          }}
        >
          <BookIcon size="small" />&nbsp;ECO Code
        </MenuItem>
        <MenuItem
          id="Nav-openingSearch-MenuItem-pgnMovetext"
          onClick={() => {
            dispatch(pgnMode.searchMovetextDialog({ open: true }));
            handleCloseOpeningSearch();
          }
        }>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem
          id="Nav-openingSearch-MenuItem-name"
          onClick={() => {
            dispatch(pgnMode.searchNameDialog({ open: true }));
            handleCloseOpeningSearch();
          }}
        >
          <SpellcheckIcon size="small" />&nbsp;Name
        </MenuItem>
      </Menu>
      <Button
        id="Nav-database"
        variant={state.nav.name === navConst.DATABASE ? "contained" : "text"}
        startIcon={<StorageIcon />}
        onClick={handleClickDatabase}
      >
        Database
      </Button>
      <Menu
        anchorEl={anchorElDatabase}
        open={Boolean(anchorElDatabase)}
        onClose={handleCloseDatabase}
      >
        <MenuItem
          id="Nav-database-MenuItem-searchGames"
          onClick={() => {
            dispatch(progressDialog.open());
            fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/autocomplete`)
              .then(res => {
                if (res.status === 200) {
                  res.json().then(data => {
                    dispatch(pgnMode.searchGamesDialog({ open: true, autocomplete: data }));
                  });
                } else {
                  dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                handleCloseDatabase();
              });
          }}
        >
          <TravelExploreIcon size="small" />&nbsp;Search Games
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-database-MenuItem-topOpenings"
          onClick={() => {
            dispatch(progressDialog.open());
            fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/stats/opening`)
              .then(res => {
                if (res.status === 200) {
                  res.json().then(data => {
                    dispatch(nav.openingsStatsDialog({ open: true, stats: data }));
                  });
                } else {
                  dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(nav.openingsStatsDialog({ open: true }));
                handleCloseDatabase();
              });
          }}
        >
          <AutoGraphIcon size="small" />&nbsp;Top 50 Openings
        </MenuItem>
        <MenuItem
          id="Nav-database-MenuItem-playersStats"
          onClick={() => {
            dispatch(progressDialog.open());
            fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/autocomplete`)
              .then(res => {
                if (res.status === 200) {
                  res.json().then(data => {
                    dispatch(nav.playersStatsDialog({ open: true, autocomplete: data }));
                  });
                } else {
                  dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(nav.playersStatsDialog({ open: true }));
                handleCloseDatabase();
              });
          }}
        >
          <QueryStatsIcon size="small" />&nbsp;Players Stats
        </MenuItem>
        <MenuItem
          id="Nav-database-MenuItem-eventsStats"
          onClick={() => {
            dispatch(progressDialog.open());
            fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/autocomplete`)
              .then(res => {
                if (res.status === 200) {
                  res.json().then(data => {
                    dispatch(nav.eventsStatsDialog({ open: true, autocomplete: data }));
                  });
                } else {
                  dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(nav.eventsStatsDialog({ open: true }));
                handleCloseDatabase();
              });
          }}
        >
          <TroubleshootIcon size="small" />&nbsp;Events Stats
        </MenuItem>
      </Menu>
      <Button
        id="Nav-training"
        variant={state.nav.name === navConst.TRAINING ? "contained" : "text"}
        startIcon={<PsychologyIcon />}
        onClick={handleClickTraining}
      >
        Training
      </Button>
      <Menu
        anchorEl={anchorElTraining}
        open={Boolean(anchorElTraining)}
        onClose={handleCloseTraining}
      >
        <MenuItem
          id="Nav-training-MenuItem-guessTheMove"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setTraining());
            handleCloseTraining();
            Ws.start(variantConst.CLASSICAL, modeConst.GM, { color: Pgn.symbol.WHITE });
          }}
        >
          <QuizIcon size="small" />&nbsp;Guess the Move
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(stockfishMode.endgameSkillsDialog({ open: true }));
            handleCloseTraining();
          }}
        >
          <ExtensionIcon size="small" />&nbsp;Endgame Skills
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-checkmateSkills"
          onClick={() => {
            dispatch(stockfishMode.checkmateSkillsDialog({ open: true }));
            handleCloseTraining();
          }}
        >
          <CheckBoxIcon size="small" />&nbsp;Checkmate Skills
        </MenuItem>
      </Menu>
      <Button
        id="Nav-inbox"
        variant={state.nav.name === navConst.CORRESPONDENCE ? "contained" : "text"}
        startIcon={<EmailIcon />}
        onClick={handleClickCorrespondence}
      >
        Correspondence
      </Button>
      <Menu
        anchorEl={anchorElCorrespondence}
        open={Boolean(anchorElCorrespondence)}
        onClose={handleCloseCorrespondence}
      >
        <MenuItem
          id="Nav-inbox-MenuItem-inviteFriend"
          onClick={() => {
            dispatch(nav.createInboxCodeDialog({ open: true }));
            handleCloseCorrespondence();
          }}
        >
          <ContactMailIcon size="small" />&nbsp;Create Inbox
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(nav.enterInboxCodeDialog({ open: false }));
            dispatch(nav.enterInboxCodeDialog({ open: true }));
            handleCloseCorrespondence();
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
  );
}

export default Nav;
