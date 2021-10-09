import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';
// dialog reducers
import loadFenDialogReducer from './loadFenDialogReducer';
import getFenDialogReducer from './getFenDialogReducer';
import requestTakebackDialogReducer from './requestTakebackDialogReducer';
import createInvitationDialogReducer from './createInvitationDialogReducer';
import enterCodeDialogReducer from './enterCodeDialogReducer';
import heuristicPictureDialogReducer from './heuristicPictureDialogReducer';
import drawAcceptDialogReducer from './drawAcceptDialogReducer';
import drawOfferDialogReducer from './drawOfferDialogReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  board: boardReducer,
  history: historyReducer,
  mode: modeReducer,
  server: serverReducer,
  // dialog reducers
  loadFenDialog: loadFenDialogReducer,
  getFenDialog: getFenDialogReducer,
  requestTakebackDialog: requestTakebackDialogReducer,
  createInvitationDialog: createInvitationDialogReducer,
  enterCodeDialog: enterCodeDialogReducer,
  heuristicPictureDialog: heuristicPictureDialogReducer,
  drawAcceptDialog: drawAcceptDialogReducer,
  drawOfferDialog: drawOfferDialogReducer
});

export default rootReducer;
