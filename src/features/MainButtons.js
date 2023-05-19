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
import * as mainButtonsConst from 'features/mainButtonsConst';
import * as mainButtons from 'features/mainButtonsSlice';
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
import * as progressDialog from 'features/dialog/progressDialogSlice';
import * as searchEcoDialog from 'features/dialog/searchEcoDialogSlice';
import * as searchGamesDialog from 'features/dialog/searchGamesDialogSlice';
import * as searchMovetextDialog from 'features/dialog/searchMovetextDialogSlice';
import * as searchNameDialog from 'features/dialog/searchNameDialogSlice';
import * as settingsDialog from 'features/dialog/settingsDialogSlice';
import * as modeConst from 'features/mode/modeConst';
import * as mode from 'features/mode/modeSlice';
import * as variantConst from 'features/variant/variantConst';
import WsAction from 'features/ws/WsAction';

const MainButtons = ({props}) => {
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
    !state.board.isMate;

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
        id="MainButtons-analysisBoard"
        sx={{ borderRadius: 0 }}
        variant={state.mainButtons.name === mainButtonsConst.ANALYSIS ? "contained" : "text"}
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
          id="MainButtons-analysisBoard-MenuItem-startClassical"
          onClick={() => {
            dispatch(mainButtons.setAnalysis());
            Dispatcher.initGui(dispatch);
            WsAction.start(variantConst.CLASSICAL, modeConst.ANALYSIS);
            handleCloseAnalysis();
          }}
        >
          <RestartAltIcon size="small" />&nbsp;Start Classical
        </MenuItem>
        <MenuItem
          id="MainButtons-analysisBoard-MenuItem-startFischerRandom960"
          onClick={() => {
            dispatch(mainButtons.setAnalysis());
            Dispatcher.initGui(dispatch);
            WsAction.start(variantConst.CHESS_960, modeConst.ANALYSIS);
            handleCloseAnalysis();
          }}
        >
          <ShuffleIcon size="small" />&nbsp;Start Fischer Random 960
        </MenuItem>
        <MenuItem
          id="MainButtons-analysisBoard-MenuItem-startCapablanca"
          onClick={() => {
            dispatch(mainButtons.setAnalysis());
            Dispatcher.initGui(dispatch);
            WsAction.start(variantConst.CAPABLANCA_80, modeConst.ANALYSIS);
            handleCloseAnalysis();
          }}
        >
          <BlurOnIcon size="small" />&nbsp;Start Capablanca
        </MenuItem>
        <Divider />
        <MenuItem
          id="MainButtons-analysisBoard-MenuItem-pgnMovetext"
          onClick={() => {
            dispatch(loadPgnDialog.open());
            handleCloseAnalysis();
          }}
        >
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem
          id="MainButtons-analysisBoard-MenuItem-fenString"
          onClick={() => {
            dispatch(loadFenDialog.open());
            handleCloseAnalysis();
          }}
        >
          <WidgetsIcon size="small" />&nbsp;FEN String
        </MenuItem>
      </Menu>
      <Button
        id="MainButtons-play"
        variant={state.mainButtons.name === mainButtonsConst.PLAY ? "contained" : "text"}
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
          id="MainButtons-play-MenuItem-computer"
          onClick={() => {
            dispatch(playComputerDialog.open());
            handleClosePlay();
          }}
        >
          <SmartToyIcon size="small" />&nbsp;Play Computer
        </MenuItem>
        <Divider />
        <MenuItem
          id="MainButtons-play-MenuItem-friend"
          onClick={() => {
            dispatch(mode.setPlay({}));
            dispatch(createInviteCodeDialog.open());
            handleClosePlay();
          }}
        >
          <PersonIcon size="small" />&nbsp;Play a Friend
        </MenuItem>
        <MenuItem
          id="MainButtons-play-MenuItem-enter-invite-code"
          onClick={() => {
            dispatch(enterInviteCodeDialog.open());
            handleClosePlay();
          }}
        >
          <KeyboardIcon size="small" />&nbsp;Enter Invite Code
        </MenuItem>
        <Divider />
        <MenuItem
          id="MainButtons-play-MenuItem-online"
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
        id="MainButtons-openingSearch"
        variant={state.mainButtons.name === mainButtonsConst.OPENING_SEARCH ? "contained" : "text"}
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
          id="MainButtons-openingSearch-MenuItem-ecoCode"
          onClick={() => {
            dispatch(searchEcoDialog.open());
            handleCloseOpeningSearch();
          }}
        >
          <BookIcon size="small" />&nbsp;ECO Code
        </MenuItem>
        <MenuItem
          id="MainButtons-openingSearch-MenuItem-pgnMovetext"
          onClick={() => {
            dispatch(searchMovetextDialog.open());
            handleCloseOpeningSearch();
          }
        }>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem
          id="MainButtons-openingSearch-MenuItem-name"
          onClick={() => {
            dispatch(searchNameDialog.open());
            handleCloseOpeningSearch();
          }}
        >
          <SpellcheckIcon size="small" />&nbsp;Name
        </MenuItem>
      </Menu>
      <Button
        id="MainButtons-database"
        variant={state.mainButtons.name === mainButtonsConst.DATABASE ? "contained" : "text"}
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
          id="MainButtons-database-MenuItem-searchGames"
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
          id="MainButtons-database-MenuItem-topOpenings"
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
          id="MainButtons-database-MenuItem-playersStats"
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
          id="MainButtons-database-MenuItem-eventsStats"
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
        id="MainButtons-training"
        variant={state.mainButtons.name === mainButtonsConst.TRAINING ? "contained" : "text"}
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
          id="MainButtons-training-MenuItem-guessTheMove"
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
          id="MainButtons-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(endgameSkillsDialog.open());
            handleCloseTraining();
          }}
        >
          <ExtensionIcon size="small" />&nbsp;Endgame Skills
        </MenuItem>
        <MenuItem
          id="MainButtons-training-MenuItem-checkmateSkills"
          onClick={() => {
            dispatch(checkmateSkillsDialog.open());
            handleCloseTraining();
          }}
        >
          <CheckBoxIcon size="small" />&nbsp;Checkmate Skills
        </MenuItem>
      </Menu>
      <Button
        id="MainButtons-inbox"
        variant={state.mainButtons.name === mainButtonsConst.CORRESPONDENCE ? "contained" : "text"}
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
          id="MainButtons-inbox-MenuItem-inviteFriend"
          onClick={() => {
            dispatch(createInboxCodeDialog.open());
            handleCloseCorrespondence();
          }}
        >
          <PersonIcon size="small" />&nbsp;Play a Friend
        </MenuItem>
        <MenuItem
          id="MainButtons-training-MenuItem-endgameSkills"
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
        id="MainButtons-settings"
        sx={{ borderRadius: 0 }}
        variant={state.mainButtons.name === mainButtonsConst.SETTINGS ? "contained" : "text"}
        startIcon={<SettingsIcon />}
        onClick={() => dispatch(settingsDialog.open())}
      >
        Settings
      </Button>
    </ButtonGroup>
  );
}

export default MainButtons;
