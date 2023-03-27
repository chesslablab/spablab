import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Capablanca80Board from './Capablanca80Board';
import Chess960Board from './Chess960Board';
import ClassicalBoard from './ClassicalBoard';
import * as variantConst from '../variant/variantConst';
import WsAction from '../../features/ws/WsAction';

const VariantBoard = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WsAction.connect(state, props)).then(ws => WsAction.startOff(ws));
  }, [dispatch]);

  const variantBoard = () => {
    if (state.variant.name === variantConst.CAPABLANCA_80) {
      return <Capablanca80Board props={props} />;
    } else if (state.variant.name === variantConst.CHESS_960) {
      return <Chess960Board props={props} />;
    }

    return <ClassicalBoard props={props} />;
  }

  return variantBoard();
}

export default VariantBoard;
