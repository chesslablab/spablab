import React from 'react';
import store from 'app/store';
import * as loadFenDialog from 'features/dialog/loadFenDialogSlice';

describe("LoadFenDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(loadFenDialog.open());
    expect(store.getState().loadFenDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(loadFenDialog.close());
    expect(store.getState().loadFenDialog.open).toBe(false);
  });
});
