import { useDispatch, useSelector } from 'react-redux';
import { HistoryButtons, SanMovesTable } from '@chesslablab/reactblab';
import * as board from 'features/board/boardSlice';
import * as panel from 'features/panel/panelSlice';

const MovesBrowser = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

  return (
    <>
      <HistoryButtons
        stateHistoryButtons={{
          back: statePanel.history.back,
          fen: stateBoard.fen,
        }}
        onFastRewindClick={() => {
          dispatch(panel.goTo({ back: stateBoard.fen.length - 1 }));
        }}
        onSkipPreviousClick={() => {
          dispatch(panel.goBack());
          dispatch(board.browseHistory());
        }}
        onSkipNextClick={() => {
          dispatch(panel.goForward());
          dispatch(board.browseHistory());
        }}
        onFastForwardClick={() => {
          dispatch(panel.goToEnd());
          dispatch(board.browseHistory());
        }}
      />
      <SanMovesTable
        stateSanMovesTable={{
          back: statePanel.history.back,
          movetext: stateBoard.movetext,
          fen: stateBoard.fen,
        }}
        onCellClick={(payload) => {
          dispatch(panel.goTo(payload));
        }}
      />
    </>
  );
}

export default MovesBrowser;
