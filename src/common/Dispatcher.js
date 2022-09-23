import Opening from '../common/Opening.js';
import * as heuristicsBar from '../features/heuristicsBarSlice';
import * as history from '../features/historySlice';
import * as board from '../features/board/boardSlice';
import * as infoAlert from '../features/alert/infoAlertSlice';
import * as gameTable from '../features/table/gameTableSlice';
import * as openingAnalysisTable from '../features/table/openingAnalysisTableSlice';
import * as variant from '../features/variant/variantSlice';

export default class Dispatcher {
  static initGui = (dispatch) => {
    dispatch(heuristicsBar.resetBar());
    dispatch(openingAnalysisTable.close());
    dispatch(gameTable.close());
    dispatch(infoAlert.close());
    dispatch(history.goTo({ back: 0 }));
    dispatch(board.start());
    dispatch(variant.startClassical());
  };

  static openingAnalysisByMovetext = (dispatch, movetext) => {
    let rows = Opening.byMovetext(movetext);
    if (rows) {
      dispatch(openingAnalysisTable.show({ rows: rows }));
    } else {
      dispatch(openingAnalysisTable.close());
    }
  };

  static openingAnalysisBySameMovetext = (dispatch, movetext) => {
    let rows = Opening.bySameMovetext(movetext);
    if (rows) {
      dispatch(openingAnalysisTable.show({ rows: rows }));
    } else {
      dispatch(openingAnalysisTable.close());
    }
  };
}
