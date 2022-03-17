import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';
// ajax loader reducers
import chessOpeningAjaxLoaderReducer from './chessOpeningAjaxLoaderReducer';
import chessOpeningSearchAjaxLoaderReducer from './chessOpeningSearchAjaxLoaderReducer';
// alert reducers
import chessOpeningAnalysisAlertReducer from './chessOpeningAnalysisAlertReducer';
import infoAlertReducer from './infoAlertReducer';
// dialog reducers
import loadFenDialogReducer from './loadFenDialogReducer';
import fenDialogReducer from './fenDialogReducer';
import takebackAcceptDialogReducer from './takebackAcceptDialogReducer';
import takebackOfferDialogReducer from './takebackOfferDialogReducer';
import createInviteCodeDialogReducer from './createInviteCodeDialogReducer';
import enterInviteCodeDialogReducer from './enterInviteCodeDialogReducer';
import heuristicPictureDialogReducer from './heuristicPictureDialogReducer';
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
import genericAjaxDialogReducer from './genericAjaxDialogReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  history: historyReducer,
  mode: modeReducer,
  server: serverReducer,
  // ajax loader reducers
  chessOpeningAjaxLoader: chessOpeningAjaxLoaderReducer,
  chessOpeningSearchAjaxLoader: chessOpeningSearchAjaxLoaderReducer,
  // alert reducers
  chessOpeningAnalysisAlert: chessOpeningAnalysisAlertReducer,
  infoAlert: infoAlertReducer,
  // dialog reducers
  loadFenDialog: loadFenDialogReducer,
  fenDialog: fenDialogReducer,
  takebackAcceptDialog: takebackAcceptDialogReducer,
  takebackOfferDialog: takebackOfferDialogReducer,
  createInviteCodeDialog: createInviteCodeDialogReducer,
  enterInviteCodeDialog: enterInviteCodeDialogReducer,
  heuristicPictureDialog: heuristicPictureDialogReducer,
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
  genericAjaxDialog: genericAjaxDialogReducer
});

export default rootReducer;
