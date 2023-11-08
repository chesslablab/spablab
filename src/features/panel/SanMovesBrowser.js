import { useDispatch, useSelector } from 'react-redux';
import {
  HistoryButtons,
  MovesMetadataTable,
  OpeningTable,
  SanMovesInline,
  SanMovesTable
} from '@chesslablab/reactblab';
import { useMediaQuery } from '@mui/material';
import * as board from 'features/board/boardSlice';
import * as panel from 'features/panel/panelSlice';

const SanMovesBrowser = () => {
  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };

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
      <MovesMetadataTable
        stateMovesMetadataTable={{
          metadata: statePanel.tables.movesMetadata,
        }}
      />
      {
        maxWidth['900']
          ? <div style={{backgroundColor: '#ffffff'}}>
              <SanMovesInline
                stateSanMovesInline={{
                  back: statePanel.history.back,
                  movetext: stateBoard.movetext,
                  fen: stateBoard.fen,
                }}
                onSpanClick={(payload) => {
                  dispatch(panel.goTo(payload));
                }}
              />
            </div>
          : <SanMovesTable
              stateSanMovesTable={{
                back: statePanel.history.back,
                movetext: stateBoard.movetext,
                fen: stateBoard.fen,
              }}
              onCellClick={(payload) => {
                dispatch(panel.goTo(payload));
              }}
            />
      }
      <OpeningTable
        stateOpeningTable={{
          opening: statePanel.tables.opening,
          fen: stateBoard.fen,
        }}
      />
    </>
  );
}

export default SanMovesBrowser;
