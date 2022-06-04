import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';
import takebackAcceptDialogReducer from './takebackAcceptDialogReducer';
import takebackOfferDialogReducer from './takebackOfferDialogReducer';
import heuristicsBarReducer from './heuristicsBarReducer';
import resignAcceptDialogReducer from './resignAcceptDialogReducer';
import playOnlineDialogReducer from './playOnlineDialogReducer';
import chessOpeningAnalysisTableReducer from './chessOpeningAnalysisTableReducer';
import gameTableReducer from './gameTableReducer';
import infoAlertReducer from '../features/alert/infoAlertSlice';
import createInviteCodeDialogReducer from '../features/dialog/createInviteCodeDialogSlice';
import drawAcceptDialogReducer from '../features/dialog/drawAcceptDialogSlice';
import drawOfferDialogReducer from '../features/dialog/drawOfferDialogSlice';
import enterInviteCodeDialogReducer from '../features/dialog/enterInviteCodeDialogSlice';
import heuristicsDialogReducer from '../features/dialog/heuristicsDialogSlice';
import loadFenDialogReducer from '../features/dialog/loadFenDialogSlice';
import loadPgnDialogReducer from '../features/dialog/loadPgnDialogSlice';
import openingSearchEcoDialogReducer from '../features/dialog/openingSearchEcoDialogSlice';
import openingSearchMovetextDialogReducer from '../features/dialog/openingSearchMovetextDialogSlice';
import openingSearchNameDialogReducer from '../features/dialog/openingSearchNameDialogSlice';
import playLikeGrandmasterDialogReducer from '../features/dialog/playLikeGrandmasterDialogSlice';
import progressDialogReducer from '../features/dialog/progressDialogSlice';
import rematchAcceptDialogReducer from '../features/dialog/rematchAcceptDialogSlice';
import rematchOfferDialogReducer from '../features/dialog/rematchOfferDialogSlice';
import watchDialogReducer from '../features/dialog/watchDialogSlice';

const rootReducer = {
  board: boardReducer,
  heuristicsBar: heuristicsBarReducer,
  history: historyReducer,
  mode: modeReducer,
  server: serverReducer,
  infoAlert: infoAlertReducer,
  loadFenDialog: loadFenDialogReducer,
  takebackAcceptDialog: takebackAcceptDialogReducer,
  takebackOfferDialog: takebackOfferDialogReducer,
  createInviteCodeDialog: createInviteCodeDialogReducer,
  enterInviteCodeDialog: enterInviteCodeDialogReducer,
  heuristicsDialog: heuristicsDialogReducer,
  drawAcceptDialog: drawAcceptDialogReducer,
  drawOfferDialog: drawOfferDialogReducer,
  resignAcceptDialog: resignAcceptDialogReducer,
  loadPgnDialog: loadPgnDialogReducer,
  rematchAcceptDialog: rematchAcceptDialogReducer,
  rematchOfferDialog: rematchOfferDialogReducer,
  playLikeGrandmasterDialog: playLikeGrandmasterDialogReducer,
  playOnlineDialog: playOnlineDialogReducer,
  openingSearchEcoDialog: openingSearchEcoDialogReducer,
  openingSearchNameDialog: openingSearchNameDialogReducer,
  openingSearchMovetextDialog: openingSearchMovetextDialogReducer,
  progressDialog: progressDialogReducer,
  chessOpeningAnalysisTable: chessOpeningAnalysisTableReducer,
  gameTable: gameTableReducer,
  watchDialog: watchDialogReducer
};

export default rootReducer;
