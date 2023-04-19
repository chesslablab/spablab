import React from 'react';
import store from 'app/store';
import * as acceptDrawDialog from 'features/dialog/acceptDrawDialogSlice';

describe("AcceptDrawDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(acceptDrawDialog.open());
    expect(store.getState().acceptDrawDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(acceptDrawDialog.close());
    expect(store.getState().acceptDrawDialog.open).toBe(false);
  });
});
