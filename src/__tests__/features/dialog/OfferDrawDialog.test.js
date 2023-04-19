import React from 'react';
import store from 'app/store';
import * as offerDrawDialog from 'features/dialog/offerDrawDialogSlice';

describe("OfferDrawDialog", () => {
  it("opens the dialog", () => {
    store.dispatch(offerDrawDialog.open());
    expect(store.getState().offerDrawDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    store.dispatch(offerDrawDialog.close());
    expect(store.getState().offerDrawDialog.open).toBe(false);
  });
});
