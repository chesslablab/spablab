import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { browseHistory as boardBrowseHistory } from '../actions/boardActions';
import {
  goToBeginning as historyGoToBeginning,
  goBack as historyGoBack,
  goForward as historyGoForward,
  goToEnd as historyGoToEnd
} from '../actions/historyActions';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="browser">
        <button
          disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
          onClick={() => {
            dispatch(historyGoToBeginning({ back: state.board.history.length - 1}));
            dispatch(boardBrowseHistory());
          }}>&lt;&lt;
        </button>
        <button
          disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
          onClick={() => {
            dispatch(historyGoBack());
            dispatch(boardBrowseHistory());
          }}>&lt;
        </button>
        <button
          disabled={state.history.back === 0}
          onClick={() => {
            dispatch(historyGoForward());
            dispatch(boardBrowseHistory());
          }}>&gt;
        </button>
        <button
          disabled={state.history.back === 0}
          onClick={() => {
            dispatch(historyGoToEnd());
            dispatch(boardBrowseHistory());
          }}>&gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default History;
