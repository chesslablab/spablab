import { resetBar } from '../features/heuristicsBarSlice';
import { closeOpeningAnalysisTable } from '../features/table/openingAnalysisTableSlice';
import { closeGameTable } from '../features/table/gameTableSlice';
import { closeInfoAlert } from '../features/alert/infoAlertSlice';
import { goTo } from '../features/historySlice';
import { start } from '../features/boardSlice';

export default class SyncAction {
  static reset = (dispatch) => {
    dispatch(resetBar());
    dispatch(closeOpeningAnalysisTable());
    dispatch(closeGameTable());
    dispatch(closeInfoAlert());
    dispatch(goTo({ back: 0 }));
    dispatch(start());
  };
}
