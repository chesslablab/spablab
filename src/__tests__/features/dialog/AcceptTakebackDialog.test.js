import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as acceptTakebackDialog from 'features/dialog/acceptTakebackDialogSlice';
import Dispatch from 'test/Dispatch';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("AcceptTakebackDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      acceptTakebackDialog.open()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.acceptTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      acceptTakebackDialog.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.acceptTakebackDialog.open).toBe(false);
  });
});
