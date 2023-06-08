import React from 'react';
import store from 'app/store';
import * as playMode from 'features/mode/playModeSlice';

describe("AcceptDrawDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(playMode.acceptDrawDialog({ open: true }));
    expect(store.getState().playMode.dialogs.acceptDraw.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(playMode.acceptDrawDialog({ open: false }));
    expect(store.getState().playMode.dialogs.acceptDraw.open).toBe(false);
  });
});
