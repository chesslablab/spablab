import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as acceptDrawDialog from 'features/dialog/acceptDrawDialogSlice';
import SyncDispatcher from 'test/SyncDispatcher';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("AcceptDrawDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      acceptDrawDialog.open()
    ];
    const { result } = renderHook(() => SyncDispatcher(actions), { wrapper });
    expect(result.current.state.acceptDrawDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      acceptDrawDialog.close()
    ];
    const { result } = renderHook(() => SyncDispatcher(actions), { wrapper });
    expect(result.current.state.acceptDrawDialog.open).toBe(false);
  });
});
