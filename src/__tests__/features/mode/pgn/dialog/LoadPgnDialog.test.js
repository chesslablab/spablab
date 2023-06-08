import React from 'react';
import store from 'app/store';
import * as pgnMode from 'features/mode/pgnModeSlice';

describe("LoadPgnDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(pgnMode.loadPgnDialog({ open: true }));
    expect(store.getState().pgnMode.dialogs.loadPgn.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(pgnMode.loadPgnDialog({ open: false }));
    expect(store.getState().pgnMode.dialogs.loadPgn.open).toBe(false);
  });
});
