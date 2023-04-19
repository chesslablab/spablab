import React from 'react';
import store from 'app/store';
import * as acceptTakebackDialog from 'features/dialog/acceptTakebackDialogSlice';

describe("AcceptTakebackDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(acceptTakebackDialog.open());
    expect(store.getState().acceptTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(acceptTakebackDialog.close());
    expect(store.getState().acceptTakebackDialog.open).toBe(false);
  });
});
