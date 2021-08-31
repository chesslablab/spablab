import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';
// dialog reducers
import loadFenDialogReducer from './loadFenDialogReducer';
import createInvitationDialogReducer from './createInvitationDialogReducer';
import enterCodeDialogReducer from './enterCodeDialogReducer';
import heuristicPictureDialogReducer from './heuristicPictureDialogReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  board: boardReducer,
  history: historyReducer,
  mode: modeReducer,
  server: serverReducer,
  // dialog reducers
  loadFenDialog: loadFenDialogReducer,
  createInvitationDialog: createInvitationDialogReducer,
  enterCodeDialog: enterCodeDialogReducer,
  heuristicPictureDialog: heuristicPictureDialogReducer,
});

export default rootReducer;
