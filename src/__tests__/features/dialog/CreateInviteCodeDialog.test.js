import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import store from 'app/store';
import * as createInviteCodeDialog from 'features/dialog/createInviteCodeDialogSlice';
import Dispatch from 'test/Dispatch';

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("CreateInviteCodeDialog", () => {
  it("opens the dialog", () => {
    const actions = [
      createInviteCodeDialog.open()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.createInviteCodeDialog.open).toBe(true);
  });
  it("closes the dialog", () => {
    const actions = [
      createInviteCodeDialog.close()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    expect(result.current.state.createInviteCodeDialog.open).toBe(false);
  });
});
