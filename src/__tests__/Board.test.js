import Board from 'components/Board.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Pgn from 'utils/Pgn.js';
import TestRenderer from 'react-test-renderer';

import BoardStore from 'stores/BoardStore.js';
import HistoryStore from 'stores/HistoryStore.js';
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
    // input given to the app
    let moves = [
      {
        piece: { color: 'w', unicode: '♙', symbol: 'P' },
        from: 'e2',
        to: 'e4'
      },
      {
        piece: { color: 'b', unicode: '♟', symbol: 'P' },
        from: 'e7',
        to: 'e5'
      },
      {
        piece: { color: 'w', unicode: '♘', symbol: 'N' },
        from: 'g1',
        to: 'f3'
      },
      {
        piece: { color: 'b', unicode: '♞', symbol: 'N' },
        from: 'b8',
        to: 'c6'
      }
    ];

    // output calculated by the app
    let pgns = [
      'e4',
      'e5',
      'Nf3',
      'Nc6'
    ];

    const ws = await ServerStore.connect();

    let move = await SquareStore.click(moves[0].from);
    let pgn = await SquareStore.click(moves[0].to);

    expect(pgn).toEqual(pgns[0]);
    expect(BoardStore.state.pieces[moves[0].to]).toEqual(moves[0].piece);
    expect(HistoryStore.state.items.pop().pgn).toEqual(pgn);

    move = await SquareStore.click(moves[1].from);
    pgn = await SquareStore.click(moves[1].to);

    expect(pgn).toEqual(pgns[1]);
    expect(BoardStore.state.pieces[moves[1].to]).toEqual(moves[1].piece);
    expect(HistoryStore.state.items.pop().pgn).toEqual(pgn);

    move = await SquareStore.click(moves[2].from);
    pgn = await SquareStore.click(moves[2].to);

    expect(pgn).toEqual(pgns[2]);
    expect(BoardStore.state.pieces[moves[2].to]).toEqual(moves[2].piece);
    expect(HistoryStore.state.items.pop().pgn).toEqual(pgn);

    move = await SquareStore.click(moves[3].from);
    pgn = await SquareStore.click(moves[3].to);

    expect(pgn).toEqual(pgns[3]);
    expect(BoardStore.state.pieces[moves[3].to]).toEqual(moves[3].piece);
    expect(HistoryStore.state.items.pop().pgn).toEqual(pgn);
  });
});
