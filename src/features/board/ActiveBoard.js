import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CapablancaSquares from 'features/board/CapablancaSquares';
import CapablancaFischerSquares from 'features/board/CapablancaFischerSquares';
import Chess960Squares from 'features/board/Chess960Squares';
import ClassicalSquares from 'features/board/ClassicalSquares';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';

const ActiveBoard = () => {
  const stateActiveMode = useSelector(state => Object.values(state).find((val, key) => val.active));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

  if (stateActiveMode?.variant === variantConst.CAPABLANCA) {
    return <CapablancaSquares />;
  } else if (stateActiveMode?.variant === variantConst.CAPABLANCA_FISCHER) {
    return <CapablancaFischerSquares />;
  } else if (stateActiveMode?.variant === variantConst.CHESS_960) {
    return <Chess960Squares />;
  }

  return <ClassicalSquares />;
}

export default ActiveBoard;
