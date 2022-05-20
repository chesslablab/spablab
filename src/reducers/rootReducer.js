import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';
import infoAlertReducer from './infoAlertReducer';
import loadFenDialogReducer from './loadFenDialogReducer';
import takebackAcceptDialogReducer from './takebackAcceptDialogReducer';
import takebackOfferDialogReducer from './takebackOfferDialogReducer';
import createGameDialogReducer from './createGameDialogReducer';
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
import openingSearchEcoDialogReducer from './openingSearchEcoDialogReducer';
import openingSearchNameDialogReducer from './openingSearchNameDialogReducer';
import openingSearchMovetextDialogReducer from './openingSearchMovetextDialogReducer';
import progressDialogReducer from './progressDialogReducer';
import chessOpeningAnalysisTableReducer from './chessOpeningAnalysisTableReducer';
import tournamentGameTableReducer from './tournamentGameTableReducer';
import watchDialogReducer from './watchDialogReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  heuristicsBar: heuristicsBarReducer,
  history: historyReducer,
  mode: modeReducer,
  server: serverReducer,
  infoAlert: infoAlertReducer,
  loadFenDialog: loadFenDialogReducer,
  takebackAcceptDialog: takebackAcceptDialogReducer,
  takebackOfferDialog: takebackOfferDialogReducer,
  createGameDialog: createGameDialogReducer,
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
  openingSearchEcoDialog: openingSearchEcoDialogReducer,
  openingSearchNameDialog: openingSearchNameDialogReducer,
  openingSearchMovetextDialog: openingSearchMovetextDialogReducer,
  progressDialog: progressDialogReducer,
  chessOpeningAnalysisTable: chessOpeningAnalysisTableReducer,
  tournamentGameTable: tournamentGameTableReducer,
  watchDialog: watchDialogReducer
});

export default rootReducer;
