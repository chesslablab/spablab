import Opening from '../common/Opening.js';
import { resetBar } from '../features/heuristicsBarSlice';
import * as infoAlert from '../features/alert/infoAlertSlice';
import * as gameTable from '../features/table/gameTableSlice';
import {
  closeOpeningAnalysisTable,
  showOpeningAnalysisTable
} from '../features/table/openingAnalysisTableSlice';
import { goTo } from '../features/historySlice';
import { start } from '../features/boardSlice';

export default class Dispatcher {
  static initGui = (dispatch) => {
    dispatch(resetBar());
    dispatch(closeOpeningAnalysisTable());
    dispatch(gameTable.close());
    dispatch(infoAlert.close());
    dispatch(goTo({ back: 0 }));
    dispatch(start());
  };

  static openingAnalysisByMovetext = (dispatch, movetext) => {
    let rows = Opening.byMovetext(movetext);
    if (rows) {
      dispatch(showOpeningAnalysisTable({ rows: rows }));
    } else {
      dispatch(closeOpeningAnalysisTable());
    }
  };

  static openingAnalysisBySameMovetext = (dispatch, movetext) => {
    let rows = Opening.bySameMovetext(movetext);
    if (rows) {
      dispatch(showOpeningAnalysisTable({ rows: rows }));
    } else {
      dispatch(closeOpeningAnalysisTable());
    }
  };
}
