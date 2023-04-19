import React from 'react';
import store from 'app/store';
import * as loadPgnDialog from 'features/dialog/loadPgnDialogSlice';

describe("LoadPgnDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(loadPgnDialog.open());
    expect(store.getState().loadPgnDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(loadPgnDialog.close());
    expect(store.getState().loadPgnDialog.open).toBe(false);
  });
});
