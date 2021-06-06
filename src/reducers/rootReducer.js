import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import serverReducer from './serverReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  history: historyReducer,
  server: serverReducer
});

export default rootReducer;
