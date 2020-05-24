import Board from 'components/Board.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Pgn from 'utils/Pgn.js';
import TestRenderer from 'react-test-renderer';

import BoardActions from 'actions/BoardActions.js'
import ServerActions from 'actions/ServerActions.js';
import SquareActions from 'actions/SquareActions.js';

import BoardStore from 'stores/BoardStore.js';
import ServerStore from 'stores/ServerStore.js';
import SquareStore from 'stores/SquareStore.js';

describe('Square colors', () => {

  const root = TestRenderer.create(<Board/>).root;

  it('a1 is black', () => {
    expect(root.findByProps({ square: "a1" }).props.color).toBe(Pgn.symbol.BLACK);
  });

  it('b1 is white', () => {
    expect(root.findByProps({ square: "b1" }).props.color).toBe(Pgn.symbol.WHITE);
  });

  it('c1 is black', () => {
    expect(root.findByProps({ square: "c1" }).props.color).toBe(Pgn.symbol.BLACK);
  });

  it('d1 is white', () => {
    expect(root.findByProps({ square: "d1" }).props.color).toBe(Pgn.symbol.WHITE);
  });

  it('e1 is black', () => {
    expect(root.findByProps({ square: "e1" }).props.color).toBe(Pgn.symbol.BLACK);
  });

  it('f1 is white', () => {
    expect(root.findByProps({ square: "f1" }).props.color).toBe(Pgn.symbol.WHITE);
  });

  // TODO ...
});

describe('Open Games', () => {
  it('Ruy Lopez', async () => {
    const ws = await ServerStore.connect();

    let move = { piece: { color: 'w', unicode: '♙', symbol: 'P' }, from: 'e2' };

    SquareActions.click('e2');
    SquareActions.click('e4');

    expect(BoardStore.state.move).toEqual(move);

    // TODO ...
  });
});
