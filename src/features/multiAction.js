import Opening from 'common/Opening.js';
import * as heuristicsBar from 'features/heuristicsBarSlice';
import * as board from 'features/board/boardSlice';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as gmMode from 'features/mode/gmModeSlice';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as panel from 'features/panel/panelSlice';

export default class multiAction {
  static initGui = (dispatch) => {
    dispatch(heuristicsBar.resetBar());
    dispatch(panel.openingTable({ open: false }));
    dispatch(panel.goToHistory({ back: 0 }));
    dispatch(pgnMode.panelTable({ open: false }));
    dispatch(infoAlert.close());
    dispatch(board.reset());
    // reset modes
    dispatch(fenMode.reset());
    dispatch(gmMode.reset());
    dispatch(pgnMode.reset());
    dispatch(playMode.reset());
    dispatch(stockfishMode.reset());
  };

  static openingByMovetext = (dispatch, movetext) => {
    dispatch(panel.openingTable({ rows: Opening.byMovetext(movetext) }));
  };

  static openingBySameMovetext = (dispatch, movetext) => {
    dispatch(panel.openingTable({ rows: Opening.bySameMovetext(movetext) }));
  };
}
