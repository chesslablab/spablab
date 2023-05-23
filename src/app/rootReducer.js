import infoAlertReducer from 'features/alert/infoAlertSlice';
import boardReducer from 'features/board/boardSlice';
import fenModeReducer from 'features/mode/fenModeSlice';
import gmModeReducer from 'features/mode/gmModeSlice';
import pgnModeReducer from 'features/mode/pgnModeSlice';
import playModeReducer from 'features/mode/playModeSlice';
import stockfishModeReducer from 'features/mode/stockfishModeSlice';
import undefinedModeReducer from 'features/mode/undefinedModeSlice';
import navReducer from 'features/nav/navSlice';
import wsReducer from 'features/ws/wsSlice';
import heuristicsBarReducer from 'features/heuristicsBarSlice';
import historyReducer from 'features/historySlice';
import progressDialogReducer from 'features/progressDialogSlice';

const rootReducer = {
  infoAlert: infoAlertReducer,
  board: boardReducer,
  fenMode: fenModeReducer,
  gmMode: gmModeReducer,
  pgnMode: pgnModeReducer,
  playMode: playModeReducer,
  stockfishMode: stockfishModeReducer,
  undefinedMode: undefinedModeReducer,
  nav: navReducer,
  server: wsReducer,
  heuristicsBar: heuristicsBarReducer,
  history: historyReducer,
  progressDialog: progressDialogReducer,
};

export default rootReducer;
