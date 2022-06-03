import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Chess from 'components/Chess';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import boardActionTypes from 'constants/boardActionTypes';
import { createInviteCodeDialogOpen } from 'features/dialog/createInviteCodeDialogSlice';
import { loadFenDialogOpen } from 'features/dialog/loadFenDialogSlice';
import store from 'store';

const SyncDispatcher = (action) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    act(() => {
      dispatch(action);
    });
  }, [dispatch]);

  return { state }
};

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

const props = {
  server: {
    prot: 'wss',
    host: 'pchess.net',
    port: '8443'
  }
};

describe("Chess", () => {
  it("is rendered", () => {
    const chess = mount(<Chess props={props} />);
  });
  it("the first chess board square is a black rook before flipping the chess board", () => {
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.board').at(0).find('.square').at(0).find('span').text();
    expect(store.getState().board.flip).toBe('w');
    expect(text).toEqual('♜');
  });
  it("the first chess board square is a white rook after flipping the chess board", () => {
    const action = { type: boardActionTypes.FLIP };
    const { result } = renderHook(() => SyncDispatcher(action), { wrapper });
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.board-row').at(0).find('.square').at(0).find('span').text();
    expect(result.current.state.board.flip).toBe('b');
    expect(text).toEqual('♖');
  });
  it("opens the 'Play a Friend' > 'Create Invite Code' dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(createInviteCodeDialogOpen()), { wrapper });
    expect(result.current.state.createInviteCodeDialog.open).toBe(true);
  });
  it("opens the 'Analysis Board' > 'FEN String' dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(loadFenDialogOpen()), { wrapper });
    expect(result.current.state.loadFenDialog.open).toBe(true);
  });
});
