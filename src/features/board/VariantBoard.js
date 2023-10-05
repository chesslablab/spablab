import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CapablancaBoard from 'features/board/CapablancaBoard';
import CapablancaFischerBoard from 'features/board/CapablancaFischerBoard';
import Chess960Board from 'features/board/Chess960Board';
import ClassicalBoard from 'features/board/ClassicalBoard';
import PawnPromotionDialog from 'features/board/PawnPromotionDialog';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';
import ResizeSlider from './ResizeSlider';

const VariantBoard = () => {
  const stateFenMode = useSelector(state => state.fenMode);

  const stateSanMode = useSelector(state => state.sanMode);

  const stateRavMode = useSelector(state => state.ravMode);

  const statePlayMode = useSelector(state => state.playMode);

  const stateStockfishMode = useSelector(state => state.stockfishMode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

  let active;
  if (stateFenMode.active) {
    active = stateFenMode;
  } else if (stateSanMode.active) {
    active = stateSanMode;
  } else if (stateRavMode.active) {
    active = stateRavMode;
  } else if (statePlayMode.active) {
    active = statePlayMode;
  } else if (stateStockfishMode.active) {
    active = stateStockfishMode;
  }

  let board;
  if (active?.variant === variantConst.CAPABLANCA) {
    board = <CapablancaBoard />;
  } else if (active?.variant === variantConst.CAPABLANCA_FISCHER) {
    board = <CapablancaFischerBoard />;
  } else if (active?.variant === variantConst.CHESS_960) {
    board = <Chess960Board />;
  } else {
    board = <ClassicalBoard />;
  }

  return (
    <>
      {board}
      <ResizeSlider />
      <PawnPromotionDialog />
    </>
  );
}

export default VariantBoard;
