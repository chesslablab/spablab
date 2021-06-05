import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Square() {
  const state = useSelector(state => state);

  const piece = () => {
    let item;
    if (this.props.square in state.board.pieces) {
      item = state.board.pieces[this.props.square].unicode;
    }

    return item;
  }

  return (
    <div>
      <span className={state.board.pieces[this.props.square] === undefined ? 'empty' : ''} >
        {piece}
      </span>
    </div>
  );
}
