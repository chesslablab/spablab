import React from 'react';
import store from 'app/store';
import * as offerTakebackDialog from 'features/dialog/offerTakebackDialogSlice';

describe("OfferTakebackDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(offerTakebackDialog.open());
    expect(store.getState().offerTakebackDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(offerTakebackDialog.close());
    expect(store.getState().offerTakebackDialog.open).toBe(false);
  });
});
