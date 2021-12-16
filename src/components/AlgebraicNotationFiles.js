import React from 'react';
import { useSelector } from 'react-redux';

const AlgebraicNotationFiles = () => {
  const state = useSelector(state => state);

  if (state.board.flip === 'w') {
    return (
      <div className="an-files">
        <span className="empty"></span>
        <span>a</span>
        <span>b</span>
        <span>c</span>
        <span>d</span>
        <span>e</span>
        <span>f</span>
        <span>g</span>
        <span>h</span>
      </div>
    );
  }

  return (
    <div className="an-files">
      <span className="empty"></span>
      <span>h</span>
      <span>g</span>
      <span>f</span>
      <span>e</span>
      <span>d</span>
      <span>c</span>
      <span>b</span>
      <span>a</span>
    </div>
  );
}

export default AlgebraicNotationFiles;
