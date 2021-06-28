import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import inviteFriendDialogReducer from './inviteFriendDialogReducer';
import serverReducer from './serverReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  history: historyReducer,
  inviteFriendDialog: inviteFriendDialogReducer,
  server: serverReducer
});

export default rootReducer;
