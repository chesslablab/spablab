import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import store from 'app/store';
import * as loadFenDialog from 'features/dialog/loadFenDialogSlice';

const SyncDispatcher = (action) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    act(() => {
      dispatch(action);
    });
  }, [dispatch]);

  return { state }
};

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("LoadFenDialog", () => {
  it("opens the dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(loadFenDialog.open()), { wrapper });
    expect(result.current.state.loadFenDialog.open).toBe(true);
  });
});
