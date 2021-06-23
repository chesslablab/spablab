import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToBeginning, goBack, goForward, goToEnd } from '../actions/historyActions';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="history">
      <button
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goToBeginning({ back: state.board.history.length - 1}))}>&lt;&lt;
      </button>
      <button
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goBack())}>&lt;
      </button>
      <button
        disabled={state.history.back === 0}
        onClick={() => dispatch(goForward())}>&gt;
      </button>
      <button
        disabled={state.history.back === 0}
        onClick={() => dispatch(goToEnd())}>&gt;&gt;
      </button>
    </div>
  );
}

export default History;
