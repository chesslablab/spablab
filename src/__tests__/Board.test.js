import Board from '../components/Board.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Symbol from '../Symbol.js';
import TestRenderer from 'react-test-renderer';

describe('Square colors', () => {

  const testRenderer = TestRenderer.create(<Board/>);
  const testInstance = testRenderer.root;

  it('a1 is black', () => {
    expect(testInstance.findByProps({square: "a1"}).props.color).toBe(Symbol.BLACK);
  });
  it('b1 is white', () => {
    expect(testInstance.findByProps({square: "b1"}).props.color).toBe(Symbol.WHITE);
  });
  it('c1 is black', () => {
    expect(testInstance.findByProps({square: "c1"}).props.color).toBe(Symbol.BLACK);
  });
  it('d1 is white', () => {
    expect(testInstance.findByProps({square: "d1"}).props.color).toBe(Symbol.WHITE);
  });
  it('e1 is black', () => {
    expect(testInstance.findByProps({square: "e1"}).props.color).toBe(Symbol.BLACK);
  });
  it('f1 is white', () => {
    expect(testInstance.findByProps({square: "f1"}).props.color).toBe(Symbol.WHITE);
  });
  // ...

});
