import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Square = ({ square, color }) => {
  const state = useSelector(state => state);

  const piece = () => {
    let item;
    if (square in state.board.pieces) {
      item = state.board.pieces[square].unicode;
    }

    return item;
  }

  return (
    <div>
      <span className={state.board.pieces[square] === undefined ? 'empty' : ''} >
        {piece()}
      </span>
    </div>
  );
}

export default Square;
