import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';
import infoAlertReducer from './infoAlertReducer';
import loadFenDialogReducer from './loadFenDialogReducer';
import takebackAcceptDialogReducer from './takebackAcceptDialogReducer';
import takebackOfferDialogReducer from './takebackOfferDialogReducer';
import createInviteCodeDialogReducer from './createInviteCodeDialogReducer';
import enterInviteCodeDialogReducer from './enterInviteCodeDialogReducer';
import heuristicsBarReducer from './heuristicsBarReducer';
import heuristicsDialogReducer from './heuristicsDialogReducer';
import drawAcceptDialogReducer from './drawAcceptDialogReducer';
import drawOfferDialogReducer from './drawOfferDialogReducer';
import resignAcceptDialogReducer from './resignAcceptDialogReducer';
import loadPgnDialogReducer from './loadPgnDialogReducer';
import rematchAcceptDialogReducer from './rematchAcceptDialogReducer';
import rematchOfferDialogReducer from './rematchOfferDialogReducer';
import playLikeGrandmasterDialogReducer from './playLikeGrandmasterDialogReducer';
import playOnlineDialogReducer from './playOnlineDialogReducer';
import openingSearchEcoDialogReducer from './openingSearchEcoDialogReducer';
import openingSearchNameDialogReducer from './openingSearchNameDialogReducer';
import openingSearchMovetextDialogReducer from './openingSearchMovetextDialogReducer';
import progressDialogReducer from './progressDialogReducer';
import chessOpeningAnalysisTableReducer from './chessOpeningAnalysisTableReducer';
import gameTableReducer from './gameTableReducer';
import watchDialogReducer from './watchDialogReducer';

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
