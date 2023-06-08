import React from 'react';
import store from 'app/store';
import * as infoAlert from 'features/alert/infoAlertSlice';

describe("InfoAlert", () => {
  it("opens the alert", () => {
    store.dispatch(infoAlert.show({ mssg: 'This is an informative message.' }));
    expect(store.getState().infoAlert.open).toBe(true);
    expect(store.getState().infoAlert.mssg).toBe('This is an informative message.');
  });
  it("closes the alert", () => {
    store.dispatch(infoAlert.close());
    expect(store.getState().infoAlert.open).toBe(false);
  });
  it("opens and closes the alert", () => {
    store.dispatch(infoAlert.show({ mssg: 'This is an informative message.' }));
    store.dispatch(infoAlert.close());
    expect(store.getState().infoAlert.mssg).toBe(null);
  });
});
