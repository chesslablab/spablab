import { useDispatch, useSelector } from 'react-redux';
import {
  HistoryButtons,
  MovesMetadataTable,
  RavMovesInline,
  RavMovesTable
} from '@chesslablab/reactblab';
import { useMediaQuery } from '@mui/material';
import * as board from 'features/board/boardSlice';
import * as panel from 'features/panel/panelSlice';

const RavMovesBrowser = () => {
  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };

  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const stateRavMode = useSelector(state => state.ravMode);

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
      <MovesMetadataTable
        stateMovesMetadataTable={{
          metadata: statePanel.tables.movesMetadata,
        }}
      />
      {
        maxWidth['900']
          ? <div style={{backgroundColor: '#ffffff'}}>
              <RavMovesInline
                stateRavMovesInline={{
                  back: statePanel.history.back,
                  fen: stateBoard.fen,
                  filtered: stateRavMode.filtered,
                  breakdown: stateRavMode.breakdown,
                }}
                onSpanClick={(payload) => {
                  dispatch(panel.goTo(payload));
                }}
              />
            </div>
          : <RavMovesTable
              stateRavMovesTable={{
                back: statePanel.history.back,
                fen: stateBoard.fen,
                filtered: stateRavMode.filtered,
                breakdown: stateRavMode.breakdown,
              }}
              onCellClick={(payload) => {
                dispatch(panel.goTo(payload));
              }}
            />
      }
    </>
  );
}

export default RavMovesBrowser;
