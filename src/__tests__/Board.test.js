import Board from '../components/Board.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Symbol from '../Symbol.js';
import TestRenderer from 'react-test-renderer';

describe('Squares colors', () => {

  const root = TestRenderer.create(<Board/>).root;

  it('a1 is black', () => {
    expect(root.findByProps({square: "a1"}).props.color).toBe(Symbol.BLACK);
  });

  it('b1 is white', () => {
    expect(root.findByProps({square: "b1"}).props.color).toBe(Symbol.WHITE);
  });

  it('c1 is black', () => {
    expect(root.findByProps({square: "c1"}).props.color).toBe(Symbol.BLACK);
  });

  it('d1 is white', () => {
    expect(root.findByProps({square: "d1"}).props.color).toBe(Symbol.WHITE);
  });

  it('e1 is black', () => {
    expect(root.findByProps({square: "e1"}).props.color).toBe(Symbol.BLACK);
  });

  it('f1 is white', () => {
    expect(root.findByProps({square: "f1"}).props.color).toBe(Symbol.WHITE);
  });

  // ...

});

describe('Move P: from e2 to e4', () => {

  const root = TestRenderer.create(<Board/>).root;

  it('e2', () => {
    const move = { piece: { color: 'w', unicode: '♙', symbol: 'P' }, from: 'e2' };
    root.findByProps({square: "e2"}).props.onClick();

    expect(root._fiber.stateNode.state.move).toEqual(move);
  });

  it('e4', () => {
    const piece = { color: 'w', unicode: '♙', symbol: 'P' };
    root.findByProps({square: "e4"}).props.onClick();

    expect(root._fiber.stateNode.state.move).toEqual(null);
    expect(root._fiber.stateNode.state.pieces['e2']).toEqual(undefined);
    expect(root._fiber.stateNode.state.pieces['e4']).toEqual(piece);
  });

});
