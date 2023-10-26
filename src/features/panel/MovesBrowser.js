import { useDispatch, useSelector } from 'react-redux';
import { MovesTable } from '@chesslablab/reactblab';
import History from 'features/panel/History';
import * as panel from 'features/panel/panelSlice';

const MovesBrowser = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

  return (
    <>
    <History />
    <MovesTable
      stateMovesTable={{
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
