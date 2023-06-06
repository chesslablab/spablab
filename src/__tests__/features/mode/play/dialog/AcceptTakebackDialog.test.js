import React from 'react';
import store from 'app/store';
import * as playMode from 'features/mode/playModeSlice';

describe("AcceptTakebackDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(playMode.acceptTakebackDialog({ open: true }));
    expect(store.getState().playMode.dialogs.acceptTakeback.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(playMode.acceptTakebackDialog({ open: false }));
    expect(store.getState().playMode.dialogs.acceptTakeback.open).toBe(false);
  });
});
