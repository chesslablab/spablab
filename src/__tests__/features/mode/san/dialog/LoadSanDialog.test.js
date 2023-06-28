import React from 'react';
import store from 'app/store';
import * as sanMode from 'features/mode/sanModeSlice';

describe("LoadSanDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(sanMode.loadPgnDialog({ open: true }));
    expect(store.getState().sanMode.dialogs.loadPgn.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(sanMode.loadPgnDialog({ open: false }));
    expect(store.getState().sanMode.dialogs.loadPgn.open).toBe(false);
  });
});
