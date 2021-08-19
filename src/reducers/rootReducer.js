import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import boardReducer from './boardReducer';
import createInvitationDialogReducer from './createInvitationDialogReducer';
import enterCodeDialogReducer from './enterCodeDialogReducer';
import heuristicPictureDialogReducer from './heuristicPictureDialogReducer';
import historyReducer from './historyReducer';
import modeReducer from './modeReducer';
import serverReducer from './serverReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  board: boardReducer,
  createInvitationDialog: createInvitationDialogReducer,
  enterCodeDialog: enterCodeDialogReducer,
  heuristicPictureDialog: heuristicPictureDialogReducer,
  history: historyReducer,
  mode: modeReducer,
  server: serverReducer
});

export default rootReducer;
