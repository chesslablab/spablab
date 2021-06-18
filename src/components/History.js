import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { browseHistory } from '../actions/boardActions';
import { goToBeginning, goBack, goForward, goToEnd } from '../actions/historyActions';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="browser">
        <button
          disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
          onClick={() => {
            dispatch(goToBeginning({ back: state.board.history.length - 1}));
            dispatch(browseHistory());
          }}>&lt;&lt;
        </button>
        <button
          disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
          onClick={() => {
            dispatch(goBack());
            dispatch(browseHistory());
          }}>&lt;
        </button>
        <button
          disabled={state.history.back === 0}
          onClick={() => {
            dispatch(goForward());
            dispatch(browseHistory());
          }}>&gt;
        </button>
        <button
          disabled={state.history.back === 0}
          onClick={() => {
            dispatch(goToEnd());
            dispatch(browseHistory());
          }}>&gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default History;
