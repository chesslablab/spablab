import React from 'react';
import store from 'app/store';
import * as fenMode from 'features/mode/fenModeSlice';

describe("LoadFenDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(fenMode.loadFenDialog({ open: true }));
    expect(store.getState().fenMode.dialogs.loadFen.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(fenMode.loadFenDialog({ open: false }));
    expect(store.getState().fenMode.dialogs.loadFen.open).toBe(false);
  });
});
