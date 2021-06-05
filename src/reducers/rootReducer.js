import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import historyReducer from './historyReducer';
import serverReducer from './serverReducer';
import squareReducer from './squareReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  history: historyReducer,
  server: serverReducer,
  square: squareReducer,
});

export default rootReducer;
