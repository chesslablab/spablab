import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as infoAlert from 'features/alert/infoAlertSlice';
import Dispatch from 'test/Dispatch';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("InfoAlert", () => {
  it("opens the alert", () => {
    const actions = [
      infoAlert.show({ info: 'This is an informative message.' })
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.infoAlert.open).toBe(true);
    expect(result.current.state.infoAlert.info).toBe('This is an informative message.');
  });
  it("closes the alert", () => {
    const actions = [
      infoAlert.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.infoAlert.open).toBe(false);
  });
  it("opens and closes the alert", () => {
    const actions = [
      infoAlert.show({ info: 'This is an informative message.' }),
      infoAlert.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.infoAlert.open).toBe(false);
  });
});
