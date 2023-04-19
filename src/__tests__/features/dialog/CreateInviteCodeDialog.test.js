import React from 'react';
import store from 'app/store';
import * as createInviteCodeDialog from 'features/dialog/createInviteCodeDialogSlice';

describe("CreateInviteCodeDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(createInviteCodeDialog.open());
    expect(store.getState().createInviteCodeDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(createInviteCodeDialog.close());
    expect(store.getState().createInviteCodeDialog.open).toBe(false);
  });
});
