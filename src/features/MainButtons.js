import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import ExtensionIcon from '@mui/icons-material/Extension';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ShuffleIcon from '@mui/icons-material/Shuffle';
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
import * as createCorrespondenceCodeDialog from 'features/dialog/createCorrespondenceCodeDialogSlice';
import * as enterCorrespondenceCodeDialog from 'features/dialog/enterCorrespondenceCodeDialogSlice';
import * as loadFenDialog from 'features/dialog/loadFenDialogSlice';
import * as loadPgnDialog from 'features/dialog/loadPgnDialogSlice';
import * as eventsStatsDialog from 'features/dialog/eventsStatsDialogSlice';
import * as openingsStatsDialog from 'features/dialog/openingsStatsDialogSlice';
import * as playersStatsDialog from 'features/dialog/playersStatsDialogSlice';
import * as searchGamesDialog from 'features/dialog/searchGamesDialogSlice';
import * as searchEcoDialog from 'features/dialog/searchEcoDialogSlice';
import * as progressDialog from 'features/dialog/progressDialogSlice';
import * as searchMovetextDialog from 'features/dialog/searchMovetextDialogSlice';
import * as searchNameDialog from 'features/dialog/searchNameDialogSlice';
import * as checkmateSkillsDialog from 'features/dialog/checkmateSkillsDialogSlice';
import * as endgameSkillsDialog from 'features/dialog/endgameSkillsDialogSlice';
import * as settingsDialog from 'features/dialog/settingsDialogSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/variant/variantConst';
import WsAction from 'features/ws/WsAction';

const MainButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);
  const [anchorElDatabase, setAnchorElDatabase] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);
  const [anchorElCorrespondence, setAnchorElCorrespondence] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const handleCloseAnalysis = () => {
    setAnchorElAnalysis(null);
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
      orientation="vertical"
      variant="text"
      aria-label="Main Menu"
      fullWidth={matches ? false : true}
      disabled={disabled}
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
        id="MainButtons-correspondence"
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
          id="MainButtons-correspondence-MenuItem-inviteFriend"
          onClick={() => {
            dispatch(createCorrespondenceCodeDialog.open());
            handleCloseCorrespondence();
          }}
        >
          <PersonIcon size="small" />&nbsp;Invite a Friend
        </MenuItem>
        <MenuItem
          id="MainButtons-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(enterCorrespondenceCodeDialog.open());
            handleCloseCorrespondence();
          }}
        >
          <MarkEmailReadIcon size="small" />&nbsp;Make a Move
        </MenuItem>
      </Menu>
      <Button
        id="MainButtons-settings"
        sx={{ borderRadius: 0 }}
        startIcon={<SettingsIcon />}
        onClick={() => dispatch(settingsDialog.open())}
      >
        Settings
      </Button>
    </ButtonGroup>
  );
}

export default MainButtons;
