import infoAlertReducer from '../features/alert/infoAlertSlice';
import acceptDrawDialogReducer from '../features/dialog/acceptDrawDialogSlice';
import acceptRematchDialogReducer from '../features/dialog/acceptRematchDialogSlice';
import acceptResignDialogReducer from '../features/dialog/acceptResignDialogSlice';
import acceptTakebackDialogReducer from '../features/dialog/acceptTakebackDialogSlice';
import checkmateSkillsDialogReducer from '../features/dialog/checkmateSkillsDialogSlice';
import createInviteCodeDialogReducer from '../features/dialog/createInviteCodeDialogSlice';
import endgameSkillsDialogReducer from '../features/dialog/endgameSkillsDialogSlice';
import enterInviteCodeDialogReducer from '../features/dialog/enterInviteCodeDialogSlice';
import eventsStatsDialogReducer from '../features/dialog/eventsStatsDialogSlice';
import heuristicsDialogReducer from '../features/dialog/heuristicsDialogSlice';
import loadFenDialogReducer from '../features/dialog/loadFenDialogSlice';
import loadPgnDialogReducer from '../features/dialog/loadPgnDialogSlice';
import offerDrawDialogReducer from '../features/dialog/offerDrawDialogSlice';
import offerRematchDialogReducer from '../features/dialog/offerRematchDialogSlice';
import offerTakebackDialogReducer from '../features/dialog/offerTakebackDialogSlice';
import playComputerDialogReducer from '../features/dialog/playComputerDialogSlice';
import playOnlineDialogReducer from '../features/dialog/playOnlineDialogSlice';
import progressDialogReducer from '../features/dialog/progressDialogSlice';
import openingsStatsDialogReducer from '../features/dialog/openingsStatsDialogSlice';
import playersStatsDialogReducer from '../features/dialog/playersStatsDialogSlice';
import searchEcoDialogReducer from '../features/dialog/searchEcoDialogSlice';
import searchGamesDialogReducer from '../features/dialog/searchGamesDialogSlice';
import searchMovetextDialogReducer from '../features/dialog/searchMovetextDialogSlice';
import searchNameDialogReducer from '../features/dialog/searchNameDialogSlice';
import watchDialogReducer from '../features/dialog/watchDialogSlice';
import gameTableReducer from '../features/table/gameTableSlice';
import openingAnalysisTableReducer from '../features/table/openingAnalysisTableSlice';
import boardReducer from '../features/boardSlice';
import heuristicsBarReducer from '../features/heuristicsBarSlice';
import historyReducer from '../features/historySlice';
import mainButtonsReducer from '../features/mainButtonsSlice';
import modeReducer from '../features/modeSlice';
import serverReducer from '../features/wsSlice';

const rootReducer = {
  infoAlert: infoAlertReducer,
  acceptDrawDialog: acceptDrawDialogReducer,
  acceptRematchDialog: acceptRematchDialogReducer,
  acceptResignDialog: acceptResignDialogReducer,
  acceptTakebackDialog: acceptTakebackDialogReducer,
  checkmateSkillsDialog: checkmateSkillsDialogReducer,
  endgameSkillsDialog: endgameSkillsDialogReducer,
  createInviteCodeDialog: createInviteCodeDialogReducer,
  enterInviteCodeDialog: enterInviteCodeDialogReducer,
  eventsStatsDialog: eventsStatsDialogReducer,
  heuristicsDialog: heuristicsDialogReducer,
  loadFenDialog: loadFenDialogReducer,
  loadPgnDialog: loadPgnDialogReducer,
  offerDrawDialog: offerDrawDialogReducer,
  offerRematchDialog: offerRematchDialogReducer,
  offerTakebackDialog: offerTakebackDialogReducer,
  playComputerDialog: playComputerDialogReducer,
  playOnlineDialog: playOnlineDialogReducer,
  progressDialog: progressDialogReducer,
  openingsStatsDialog: openingsStatsDialogReducer,
  playersStatsDialog: playersStatsDialogReducer,
  searchEcoDialog: searchEcoDialogReducer,
  searchGamesDialog: searchGamesDialogReducer,
  searchMovetextDialog: searchMovetextDialogReducer,
  searchNameDialog: searchNameDialogReducer,
  watchDialog: watchDialogReducer,
  gameTable: gameTableReducer,
  openingAnalysisTable: openingAnalysisTableReducer,
  board: boardReducer,
  heuristicsBar: heuristicsBarReducer,
  history: historyReducer,
  mainButtons: mainButtonsReducer,
  mode: modeReducer,
  server: serverReducer
};

export default rootReducer;
