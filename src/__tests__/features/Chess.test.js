import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import store from 'app/store';
import * as board from 'features/board/boardSlice';
import Chess from 'features/Chess';

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
  it("is a black rook on a8 before flipping the chess board", () => {
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.classicalBoard').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(store.getState().board.flip).toBe('w');
    expect(text).toEqual('bRook.svg');
  });
  it("is a white rook on h1 after flipping the chess board", () => {
    const { result } = renderHook(() => SyncDispatcher(board.flip()), { wrapper });
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.classicalBoard').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(result.current.state.board.flip).toBe('b');
    expect(text).toEqual('wRook.svg');
  });
});
