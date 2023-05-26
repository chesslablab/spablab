import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import storeParser from 'app/storeParser';
import Capablanca80Board from 'features/board/Capablanca80Board';
import Chess960Board from 'features/board/Chess960Board';
import ClassicalBoard from 'features/board/ClassicalBoard';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';

const VariantBoard = ({props}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect(props)).then(() => Ws.startOff());
  }, [props, dispatch]);

  const variantBoard = () => {
    if (storeParser.getActiveMode().variant === variantConst.CAPABLANCA_80) {
      return <Capablanca80Board props={props} />;
    } else if (storeParser.getActiveMode().variant === variantConst.CHESS_960) {
      return <Chess960Board props={props} />;
    }

    return <ClassicalBoard props={props} />;
  }

  return variantBoard();
}

export default VariantBoard;
