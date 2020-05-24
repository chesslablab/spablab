import Board from 'components/Board.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Pgn from 'utils/Pgn.js';
import TestRenderer from 'react-test-renderer';

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
    let game = [
      {
        move: { piece: { color: 'w', unicode: '♙', symbol: 'P' }, from: 'e2' },
        to: 'e4'
      },
      {
        move: { piece: { color: 'b', unicode: '♟', symbol: 'P' }, from: 'e7' },
        to: 'e5'
      }
    ];

    await SquareStore.click(game[0].move.from);
    await SquareStore.click(game[0].to);
    expect(BoardStore.state.pieces[game[0].to]).toEqual(game[0].move.piece);

    await SquareStore.click(game[1].move.from);
    await SquareStore.click(game[1].to);
    expect(BoardStore.state.pieces[game[1].to]).toEqual(game[1].move.piece);
  });
});
