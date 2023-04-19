import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import store from 'app/store';
import * as board from 'features/board/boardSlice';
import Chess from 'features/Chess';
import Dispatch from 'test/Dispatch';

const props = {
  server: {
    prot: 'wss',
    host: 'pchess.net',
    port: '8443'
  }
};

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe("Chess", () => {
  it("is a black rook on a8 before flipping the chess board", () => {
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.classicalBoard').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(store.getState().board.flip).toBe('w');
    expect(text).toEqual('bRook.svg');
  });
  it("is a white rook on h1 after flipping the chess board", () => {
    const actions = [
      board.flip()
    ];
    const { result } = renderHook(() => Dispatch(actions), { wrapper });
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.classicalBoard').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(result.current.state.board.flip).toBe('b');
    expect(text).toEqual('wRook.svg');
  });
});
