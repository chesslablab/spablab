import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as loadPgnDialog from 'features/dialog/loadPgnDialogSlice';
import Dispatch from 'test/Dispatch';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("LoadPgnDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      loadPgnDialog.open()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.loadPgnDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      loadPgnDialog.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.loadPgnDialog.open).toBe(false);
  });
});
