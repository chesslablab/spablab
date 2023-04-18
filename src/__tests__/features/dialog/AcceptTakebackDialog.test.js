import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import store from 'app/store';
import * as acceptTakebackDialog from 'features/dialog/acceptTakebackDialogSlice';

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

describe("AcceptTakebackDialog", () => {
  it("opens the dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(acceptTakebackDialog.open()), { wrapper });
    expect(result.current.state.acceptTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(acceptTakebackDialog.close()), { wrapper });
    expect(result.current.state.acceptTakebackDialog.open).toBe(false);
  });
});
