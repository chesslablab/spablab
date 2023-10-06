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
  const stateActiveMode = useSelector(state => Object.values(state).find((val, key) => val.active));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

  let board;
  if (stateActiveMode?.variant === variantConst.CAPABLANCA) {
    board = <CapablancaBoard />;
  } else if (stateActiveMode?.variant === variantConst.CAPABLANCA_FISCHER) {
    board = <CapablancaFischerBoard />;
  } else if (stateActiveMode?.variant === variantConst.CHESS_960) {
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
