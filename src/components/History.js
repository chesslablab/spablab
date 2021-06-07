import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  goToBeginning as historyGoToBeginning,
  goBack as historyGoBack,
  goForward as historyGoForward,
  goToEnd as historyGoToEnd
} from 'actions/historyActions';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="browser">
        <button
          disabled={false}
          onClick={() => dispatch(historyGoToBeginning())}>&lt;&lt;
        </button>
        <button
          disabled={false}
          onClick={() => dispatch(historyGoBack())}>&lt;
        </button>
        <button
          disabled={false}
          onClick={() => dispatch(historyGoForward())}>&gt;
        </button>
        <button
          disabled={false}
          onClick={() => dispatch(historyGoToEnd({ back: state.board.history.length - 1 }))}>&gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default History;
