import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CapablancaBoard from 'features/board/CapablancaBoard';
import Chess960Board from 'features/board/Chess960Board';
import ClassicalBoard from 'features/board/ClassicalBoard';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';

const VariantBoard = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect(props))
      .then(() => Ws.start(
        variantConst.CLASSICAL,
        modeConst.FEN
      ));
  }, [props, dispatch]);

  const activeMode = Object.values(state).find((val, key) => val.active);

  if (activeMode?.variant === variantConst.CAPABLANCA) {
    return <CapablancaBoard />;
  } else if (activeMode?.variant === variantConst.CHESS_960) {
    return <Chess960Board />;
  }

  return <ClassicalBoard />;
}

export default VariantBoard;
