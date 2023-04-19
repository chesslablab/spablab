import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as acceptTakebackDialog from 'features/dialog/acceptTakebackDialogSlice';
import SyncDispatcher from 'test/SyncDispatcher';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("AcceptTakebackDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      acceptTakebackDialog.open()
    ];
    const { result } = renderHook(() => SyncDispatcher(actions), { wrapper });
    expect(result.current.state.acceptTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      acceptTakebackDialog.close()
    ];
    const { result } = renderHook(() => SyncDispatcher(actions), { wrapper });
    expect(result.current.state.acceptTakebackDialog.open).toBe(false);
  });
});
