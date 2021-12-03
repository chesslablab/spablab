import React from 'react';
import { useSelector } from 'react-redux';

const AlgebraicNotationRanks = () => {
  const state = useSelector(state => state);

  if (state.board.flip === 'w') {
    return (
      <div className="an-ranks">
        <span>8</span>
        <span>7</span>
        <span>6</span>
        <span>5</span>
        <span>4</span>
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </div>
    );
  }

  return (
    <div className="an-ranks">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
    </div>
  );
}

export default AlgebraicNotationRanks;
