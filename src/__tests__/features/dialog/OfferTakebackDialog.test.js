import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import store from 'app/store';
import * as offerTakebackDialog from 'features/dialog/offerTakebackDialogSlice';

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

describe("OfferTakebackDialog", () => {
  it("opens the dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(offerTakebackDialog.open()), { wrapper });
    expect(result.current.state.offerTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(offerTakebackDialog.close()), { wrapper });
    expect(result.current.state.offerTakebackDialog.open).toBe(false);
  });
});
