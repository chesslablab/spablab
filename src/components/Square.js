import BoardStore from '../stores/BoardStore.js';
import SquareActions from '../actions/SquareActions.js';
import React from 'react';

export default class Square extends React.Component {
  click(square) {
    SquareActions.click(square);
  }

  renderPiece(square) {
    if (square in BoardStore.getState().pieces) {
      return (
        BoardStore.getState().pieces[square].unicode
      );
    }
  }

  render() {
    return (
      <div className={['square', this.props.color].join(' ')} onClick={() => this.click(this.props.square)}>
        <span className={BoardStore.getState().pieces[this.props.square] === undefined ? 'empty' : ''} >
          {this.renderPiece(this.props.square)}
        </span>
      </div>
    );
  }
}
