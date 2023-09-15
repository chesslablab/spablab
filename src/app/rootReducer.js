import infoAlertReducer from 'features/alert/infoAlertSlice';
import warningAlertReducer from 'features/alert/warningAlertSlice';
import eventAutocompleteReducer from 'features/autocomplete/eventAutocompleteSlice';
import playerAutocompleteReducer from 'features/autocomplete/playerAutocompleteSlice';
import boardReducer from 'features/board/boardSlice';
import fenModeReducer from 'features/mode/fenModeSlice';
import sanModeReducer from 'features/mode/sanModeSlice';
import ravModeReducer from 'features/mode/ravModeSlice';
import playModeReducer from 'features/mode/playModeSlice';
import stockfishModeReducer from 'features/mode/stockfishModeSlice';
import navReducer from 'features/nav/navSlice';
import panelReducer from 'features/panel/panelSlice';
import wsReducer from 'features/ws/wsSlice';
import heuristicsReducer from 'features/heuristicsSlice';
import positionEvalReducer from 'features/positionEvalSlice';
import progressDialogReducer from 'features/progressDialogSlice';

const rootReducer = {
  infoAlert: infoAlertReducer,
  warningAlert: warningAlertReducer,
  eventAutocomplete: eventAutocompleteReducer,
  playerAutocomplete: playerAutocompleteReducer,
  board: boardReducer,
  fenMode: fenModeReducer,
  sanMode: sanModeReducer,
  ravMode: ravModeReducer,
  playMode: playModeReducer,
  stockfishMode: stockfishModeReducer,
  nav: navReducer,
  panel: panelReducer,
  ws: wsReducer,
  heuristics: heuristicsReducer,
  positionEval: positionEvalReducer,
  progressDialog: progressDialogReducer
};

export default rootReducer;
