import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import createInvitationDialogReducer from './createInvitationDialogReducer';
import enterCodeDialogReducer from './enterCodeDialogReducer';
import serverReducer from './serverReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  history: historyReducer,
  createInvitationDialog: createInvitationDialogReducer,
  enterCodeDialog: enterCodeDialogReducer,
  server: serverReducer
});

export default rootReducer;
