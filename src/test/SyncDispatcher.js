import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { act } from 'react-dom/test-utils';

const SyncDispatcher = (actions) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    act(() => {
      actions.forEach(action => dispatch(action));
    });
  }, [dispatch]);

  return { state }
};

export default SyncDispatcher;
