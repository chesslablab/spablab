import BoardStore from '../stores/BoardStore.js';
import SquareStore from '../stores/SquareStore.js';
import SquareActions from '../actions/SquareActions.js';
import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = SquareStore.getState();
  }

  click(square) {
    SquareActions.click(square);
  }

  render() {
    let piece;
    if (this.props.square in BoardStore.getState().pieces) {
      piece = BoardStore.getState().pieces[this.props.square].unicode;
    }
    return (
      <div className={['square', this.props.color].join(' ')} onClick={() => this.click(this.props.square)}>
        <span className={BoardStore.getState().pieces[this.props.square] === undefined ? 'empty' : ''} >
          {piece}
        </span>
      </div>
    );
  }
}
