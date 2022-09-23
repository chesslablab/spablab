import React from 'react';
import { useSelector } from 'react-redux';
import Chess960Board from './Chess960Board';
import ClassicalBoard from './ClassicalBoard';
import * as variantConst from './variant/variantConst';

const VariantBoard = ({props}) => {
  const state = useSelector(state => state);

  const variantBoard = () => {
    if (state.variant.name === variantConst.CHESS_960) {
      return <Chess960Board props={props} />;
    }

    return <ClassicalBoard props={props} />;
  }

  return variantBoard();
}

export default VariantBoard;
