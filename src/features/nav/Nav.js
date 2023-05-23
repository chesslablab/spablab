import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
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
import Dispatcher from 'common/Dispatcher';
import Pgn from 'common/Pgn';
import Wording from 'common/Wording';
import * as navConst from 'features/nav/navConst';
import * as mainButtons from 'features/navSlice';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as checkmateSkillsDialog from 'features/dialog/checkmateSkillsDialogSlice';
import * as createInboxCodeDialog from 'features/dialog/createInboxCodeDialogSlice';
import * as createInviteCodeDialog from 'features/dialog/createInviteCodeDialogSlice';
import * as endgameSkillsDialog from 'features/dialog/endgameSkillsDialogSlice';
import * as enterInboxCodeDialog from 'features/dialog/enterInboxCodeDialogSlice';
import * as enterInviteCodeDialog from 'features/dialog/enterInviteCodeDialogSlice';
import * as eventsStatsDialog from 'features/dialog/eventsStatsDialogSlice';
import * as loadFenDialog from 'features/dialog/loadFenDialogSlice';
import * as loadPgnDialog from 'features/dialog/loadPgnDialogSlice';
import * as openingsStatsDialog from 'features/dialog/openingsStatsDialogSlice';
import * as playComputerDialog from 'features/dialog/playComputerDialogSlice';
import * as playOnlineDialog from 'features/dialog/playOnlineDialogSlice';
import * as playersStatsDialog from 'features/dialog/playersStatsDialogSlice';
import * as progressDialog from 'features/progressDialogSlice';
import * as searchEcoDialog from 'features/dialog/searchEcoDialogSlice';
import * as searchGamesDialog from 'features/dialog/searchGamesDialogSlice';
import * as searchMovetextDialog from 'features/dialog/searchMovetextDialogSlice';
import * as searchNameDialog from 'features/dialog/searchNameDialogSlice';
import * as settingsDialog from 'features/dialog/settingsDialogSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as mode from 'features/mode/modeSlice';
import WsAction from 'features/ws/WsAction';

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

  const disabled = state.mode.name === modeConst.PLAY &&
    state.mode.play.accepted &&
    (!state.mode.play.draw || state.mode.play.draw === Wording.verb.PROPOSE.toLowerCase()) &&
    !state.mode.play.resign &&
    !state.mode.play.leave &&
    !state.mode.play.timer.over &&
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
        variant={state.mainButtons.name === navConst.ANALYSIS ? "contained" : "text"}
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
            dispatch(mainButtons.setAnalysis());
            Dispatcher.initGui(dispatch);
            WsAction.startOff();
            handleCloseAnalysis();
          }}
        >
          <RestartAltIcon size="small" />&nbsp;Start Classical
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startFischerRandom960"
          onClick={() => {
            dispatch(mainButtons.setAnalysis());
            Dispatcher.initGui(dispatch);
            WsAction.start(variantConst.CHESS_960, modeConst.FEN);
            handleCloseAnalysis();
          }}
        >
          <ShuffleIcon size="small" />&nbsp;Start Fischer Random 960
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startCapablanca"
          onClick={() => {
            dispatch(mainButtons.setAnalysis());
            Dispatcher.initGui(dispatch);
            WsAction.start(variantConst.CAPABLANCA_80, modeConst.FEN);
            handleCloseAnalysis();
          }}
        >
          <BlurOnIcon size="small" />&nbsp;Start Capablanca
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-analysisBoard-MenuItem-pgnMovetext"
          onClick={() => {
            dispatch(loadPgnDialog.open());
            handleCloseAnalysis();
          }}
        >
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-fenString"
          onClick={() => {
            dispatch(loadFenDialog.open());
            handleCloseAnalysis();
          }}
        >
          <WidgetsIcon size="small" />&nbsp;FEN String
        </MenuItem>
      </Menu>
      <Button
        id="Nav-play"
        variant={state.mainButtons.name === navConst.PLAY ? "contained" : "text"}
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
            dispatch(playComputerDialog.open());
            handleClosePlay();
          }}
        >
          <SmartToyIcon size="small" />&nbsp;Play Computer
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-play-MenuItem-friend"
          onClick={() => {
            dispatch(mode.setPlay({}));
            dispatch(createInviteCodeDialog.open());
            handleClosePlay();
          }}
        >
          <PersonIcon size="small" />&nbsp;Play a Friend
        </MenuItem>
        <MenuItem
          id="Nav-play-MenuItem-enter-invite-code"
          onClick={() => {
            dispatch(enterInviteCodeDialog.open());
            handleClosePlay();
          }}
        >
          <KeyboardIcon size="small" />&nbsp;Enter Invite Code
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-play-MenuItem-online"
          onClick={() => {
            WsAction.onlineGames();
            dispatch(playOnlineDialog.open());
            handleClosePlay();
          }}
        >
          <LanguageIcon size="small" />&nbsp;Play Online
        </MenuItem>
      </Menu>
      <Button
        id="Nav-openingSearch"
        variant={state.mainButtons.name === navConst.OPENING_SEARCH ? "contained" : "text"}
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
            dispatch(searchEcoDialog.open());
            handleCloseOpeningSearch();
          }}
        >
          <BookIcon size="small" />&nbsp;ECO Code
        </MenuItem>
        <MenuItem
          id="Nav-openingSearch-MenuItem-pgnMovetext"
          onClick={() => {
            dispatch(searchMovetextDialog.open());
            handleCloseOpeningSearch();
          }
        }>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem
          id="Nav-openingSearch-MenuItem-name"
          onClick={() => {
            dispatch(searchNameDialog.open());
            handleCloseOpeningSearch();
          }}
        >
          <SpellcheckIcon size="small" />&nbsp;Name
        </MenuItem>
      </Menu>
      <Button
        id="Nav-database"
        variant={state.mainButtons.name === navConst.DATABASE ? "contained" : "text"}
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
                    dispatch(searchGamesDialog.setAutocomplete(data));
                  });
                } else {
                  dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(searchGamesDialog.open());
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
                    dispatch(openingsStatsDialog.setStats(data));
                  });
                } else {
                  dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(openingsStatsDialog.open());
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
                    dispatch(playersStatsDialog.setAutocomplete(data));
                  });
                } else {
                  dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(playersStatsDialog.open());
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
                    dispatch(eventsStatsDialog.setAutocomplete(data));
                  });
                } else {
                  dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
                }
              })
              .finally(() => {
                dispatch(progressDialog.close());
                dispatch(eventsStatsDialog.open());
                handleCloseDatabase();
              });
          }}
        >
          <TroubleshootIcon size="small" />&nbsp;Events Stats
        </MenuItem>
      </Menu>
      <Button
        id="Nav-training"
        variant={state.mainButtons.name === navConst.TRAINING ? "contained" : "text"}
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
            dispatch(mainButtons.setTraining());
            Dispatcher.initGui(dispatch);
            WsAction.start(variantConst.CLASSICAL, modeConst.GM, {
              color: Pgn.symbol.WHITE
            });
            handleCloseTraining();
          }}
        >
          <QuizIcon size="small" />&nbsp;Guess the Move
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(endgameSkillsDialog.open());
            handleCloseTraining();
          }}
        >
          <ExtensionIcon size="small" />&nbsp;Endgame Skills
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-checkmateSkills"
          onClick={() => {
            dispatch(checkmateSkillsDialog.open());
            handleCloseTraining();
          }}
        >
          <CheckBoxIcon size="small" />&nbsp;Checkmate Skills
        </MenuItem>
      </Menu>
      <Button
        id="Nav-inbox"
        variant={state.mainButtons.name === navConst.CORRESPONDENCE ? "contained" : "text"}
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
            dispatch(createInboxCodeDialog.open());
            handleCloseCorrespondence();
          }}
        >
          <PersonIcon size="small" />&nbsp;Play a Friend
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(enterInboxCodeDialog.close());
            dispatch(enterInboxCodeDialog.open());
            handleCloseCorrespondence();
          }}
        >
          <InboxIcon size="small" />&nbsp;Read Inbox
        </MenuItem>
      </Menu>
      <Button
        id="Nav-settings"
        sx={{ borderRadius: 0 }}
        variant={state.mainButtons.name === navConst.SETTINGS ? "contained" : "text"}
        startIcon={<SettingsIcon />}
        onClick={() => dispatch(settingsDialog.open())}
      >
        Settings
      </Button>
    </ButtonGroup>
  );
}

export default Nav;
