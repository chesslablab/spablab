import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import store from 'app/store';
import * as board from 'features/board/boardSlice';
import App from 'App';

describe("Chess", () => {
  it("is a black rook on a8 before flipping the chess board", () => {
    const chess = mount(<App />);
    const text = chess.find('.classicalBoard').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(store.getState().board.flip).toBe('w');
    expect(text).toEqual('bRook.svg');
  });
  it("is a white rook on h1 after flipping the chess board", () => {
    act(() => {
      store.dispatch(board.flip());
    });
    const chess = mount(<App />);
    const text = chess.find('.classicalBoard').at(0).find('.sq').at(0).find('img').at(0).prop('src');
    expect(store.getState().board.flip).toBe('b');
    expect(text).toEqual('wRook.svg');
  });
});
