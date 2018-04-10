import Board from '../components/Board.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Pgn from '../Pgn.js';
import TestRenderer from 'react-test-renderer';

describe('Squares colors', () => {

  const root = TestRenderer.create(<Board/>).root;

  it('a1 is black', () => {
    expect(root.findByProps({square: "a1"}).props.color).toBe(Pgn.symbol.BLACK);
  });

  it('b1 is white', () => {
    expect(root.findByProps({square: "b1"}).props.color).toBe(Pgn.symbol.WHITE);
  });

  it('c1 is black', () => {
    expect(root.findByProps({square: "c1"}).props.color).toBe(Pgn.symbol.BLACK);
  });

  it('d1 is white', () => {
    expect(root.findByProps({square: "d1"}).props.color).toBe(Pgn.symbol.WHITE);
  });

  it('e1 is black', () => {
    expect(root.findByProps({square: "e1"}).props.color).toBe(Pgn.symbol.BLACK);
  });

  it('f1 is white', () => {
    expect(root.findByProps({square: "f1"}).props.color).toBe(Pgn.symbol.WHITE);
  });

  // ...

});

describe('Move w P from e2 to e4', () => {
  const root = TestRenderer.create(<Board/>).root;

  it('e2', () => {
    const move = { piece: { color: 'w', unicode: '♙', symbol: 'P' }, from: 'e2' };
    root.findByProps({square: "e2"}).props.onClick();

    expect(root._fiber.stateNode.state.move).toEqual(move);
  });

  it('e4', () => {
    let piece = { color: 'w', unicode: '♙', symbol: 'P' };
    root.findByProps({square: "e4"}).props.onClick();
    // get last move
    let last = root._fiber.stateNode.state.history.slice(-1)[0];

    expect(root._fiber.stateNode.state.move).toEqual(null);
    expect(root._fiber.stateNode.state.pieces['e2']).toEqual(undefined);
    expect(root._fiber.stateNode.state.pieces['e4']).toEqual(piece);
    expect(last.color).toEqual(Pgn.symbol.WHITE);
    expect(last.pgn).toEqual('e4');
  });
});

describe('W O-O, legal sequence', () => {
  const root = TestRenderer.create(<Board/>).root;
  it('Legal opening', () => {
    let piece = { color: 'w', unicode: '♔', symbol: 'K' };
    // e4
    root.findByProps({square: "e2"}).props.onClick();
    root.findByProps({square: "e4"}).props.onClick();
    // Bb5
    root.findByProps({square: "f1"}).props.onClick();
    root.findByProps({square: "b5"}).props.onClick();
    // Nf3
    root.findByProps({square: "g1"}).props.onClick();
    root.findByProps({square: "f3"}).props.onClick();
    // O-O
    root.findByProps({square: "e1"}).props.onClick();
    root.findByProps({square: "g1"}).props.onClick();
    // last move
    let last = root._fiber.stateNode.state.history.slice(-1)[0];

    expect(root._fiber.stateNode.state.pieces['g1']).toEqual(piece);
    expect(last.color).toEqual('w');
    expect(last.pgn).toEqual('O-O');
  });
});

describe('B O-O, legal sequence', () => {
  const root = TestRenderer.create(<Board/>).root;
  it('Legal opening', () => {
    let piece = { color: 'b', unicode: '♚', symbol: 'K' };
    // e5
    root.findByProps({square: "e7"}).props.onClick();
    root.findByProps({square: "e5"}).props.onClick();
    // Nf6
    root.findByProps({square: "g8"}).props.onClick();
    root.findByProps({square: "f6"}).props.onClick();
    // Bb4
    root.findByProps({square: "f8"}).props.onClick();
    root.findByProps({square: "b4"}).props.onClick();
    // O-O
    root.findByProps({square: "e8"}).props.onClick();
    root.findByProps({square: "g8"}).props.onClick();
    // last move
    let last = root._fiber.stateNode.state.history.slice(-1)[0];

    expect(root._fiber.stateNode.state.pieces['g8']).toEqual(piece);
    expect(last.color).toEqual('b');
    expect(last.pgn).toEqual('O-O');
  });
});
