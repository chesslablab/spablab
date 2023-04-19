import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as offerTakebackDialog from 'features/dialog/offerTakebackDialogSlice';
import Dispatch from 'test/Dispatch';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("OfferTakebackDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      offerTakebackDialog.open()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.offerTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      offerTakebackDialog.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.offerTakebackDialog.open).toBe(false);
  });
});
