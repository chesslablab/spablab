import infoAlertReducer from '../features/alert/infoAlertSlice';
import acceptDrawDialogReducer from '../features/dialog/acceptDrawDialogSlice';
import acceptRematchDialogReducer from '../features/dialog/acceptRematchDialogSlice';
import acceptResignDialogReducer from '../features/dialog/acceptResignDialogSlice';
import acceptTakebackDialogReducer from '../features/dialog/acceptTakebackDialogSlice';
import checkmateSkillsDialogReducer from '../features/dialog/checkmateSkillsDialogSlice';
import createInviteCodeDialogReducer from '../features/dialog/createInviteCodeDialogSlice';
import searchGamesDialogReducer from '../features/dialog/searchGamesDialogSlice';
import enterInviteCodeDialogReducer from '../features/dialog/enterInviteCodeDialogSlice';
import heuristicsDialogReducer from '../features/dialog/heuristicsDialogSlice';
import loadFenDialogReducer from '../features/dialog/loadFenDialogSlice';
import loadPgnDialogReducer from '../features/dialog/loadPgnDialogSlice';
import offerDrawDialogReducer from '../features/dialog/offerDrawDialogSlice';
import offerRematchDialogReducer from '../features/dialog/offerRematchDialogSlice';
import offerTakebackDialogReducer from '../features/dialog/offerTakebackDialogSlice';
import playComputerDialogReducer from '../features/dialog/playComputerDialogSlice';
import playOnlineDialogReducer from '../features/dialog/playOnlineDialogSlice';
import progressDialogReducer from '../features/dialog/progressDialogSlice';
import searchEcoDialogReducer from '../features/dialog/searchEcoDialogSlice';
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
  createInviteCodeDialog: createInviteCodeDialogReducer,
  searchGamesDialog: searchGamesDialogReducer,
  enterInviteCodeDialog: enterInviteCodeDialogReducer,
  heuristicsDialog: heuristicsDialogReducer,
  loadFenDialog: loadFenDialogReducer,
  loadPgnDialog: loadPgnDialogReducer,
  offerDrawDialog: offerDrawDialogReducer,
  offerRematchDialog: offerRematchDialogReducer,
  offerTakebackDialog: offerTakebackDialogReducer,
  playComputerDialog: playComputerDialogReducer,
  playOnlineDialog: playOnlineDialogReducer,
  progressDialog: progressDialogReducer,
  searchEcoDialog: searchEcoDialogReducer,
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
