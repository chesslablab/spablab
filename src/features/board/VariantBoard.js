import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CapablancaBoard from 'features/board/CapablancaBoard';
import Chess960Board from 'features/board/Chess960Board';
import ClassicalBoard from 'features/board/ClassicalBoard';
import PawnPromotionDialog from 'features/board/PawnPromotionDialog';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';

const VariantBoard = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

  const activeMode = Object.values(state).find((val, key) => val.active);

  if (activeMode?.variant === variantConst.CAPABLANCA) {
    return (
      <>
        <CapablancaBoard />
        <PawnPromotionDialog />
      </>
    );
  } else if (activeMode?.variant === variantConst.CHESS_960) {
    return (
      <>
        <Chess960Board />
        <PawnPromotionDialog />
      </>
    );
  }

  return (
    <>
      <ClassicalBoard />
      <PawnPromotionDialog />
    </>
  );
}

export default VariantBoard;
