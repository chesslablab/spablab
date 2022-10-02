import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Chess from 'features/Chess';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import * as createInviteCodeDialog from 'features/dialog/createInviteCodeDialogSlice';
import * as loadFenDialog from 'features/dialog/loadFenDialogSlice';
import * as loadPgnDialog from 'features/dialog/loadPgnDialogSlice';
import { flip } from 'features/board/boardSlice';
import store from 'app/store';

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
    const text = chess.find('.board').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(store.getState().board.flip).toBe('w');
    expect(text).toEqual('bRook.svg');
  });
  it("the first chess board square is a white rook after flipping the chess board", () => {
    const { result } = renderHook(() => SyncDispatcher(flip()), { wrapper });
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.board').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(result.current.state.board.flip).toBe('b');
    expect(text).toEqual('wRook.svg');
  });
  it("opens the 'Play a Friend' > 'Create Invite Code' dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(createInviteCodeDialog.open()), { wrapper });
    expect(result.current.state.createInviteCodeDialog.open).toBe(true);
  });
  it("opens the 'Analysis Board' > 'FEN String' dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(loadFenDialog.open()), { wrapper });
    expect(result.current.state.loadFenDialog.open).toBe(true);
  });
  it("opens the 'Analysis Board' > 'PGN Movetext' dialog", () => {
    const { result } = renderHook(() => SyncDispatcher(loadPgnDialog.open()), { wrapper });
    expect(result.current.state.loadPgnDialog.open).toBe(true)
  })
});
