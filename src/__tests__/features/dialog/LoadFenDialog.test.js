import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as loadFenDialog from 'features/dialog/loadFenDialogSlice';
import Dispatch from 'test/Dispatch';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("LoadFenDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      loadFenDialog.open()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.loadFenDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      loadFenDialog.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.loadFenDialog.open).toBe(false);
  });
});
