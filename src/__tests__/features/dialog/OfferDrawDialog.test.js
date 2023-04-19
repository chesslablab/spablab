import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as offerDrawDialog from 'features/dialog/offerDrawDialogSlice';
import SyncDispatcher from 'test/SyncDispatcher';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("OfferDrawDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      offerDrawDialog.open()
    ];
    const { result } = renderHook(() => SyncDispatcher(actions), { wrapper });
    expect(result.current.state.offerDrawDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      offerDrawDialog.close()
    ];
    const { result } = renderHook(() => SyncDispatcher(actions), { wrapper });
    expect(result.current.state.offerDrawDialog.open).toBe(false);
  });
});
