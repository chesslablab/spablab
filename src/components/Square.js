import React from 'react';

export default class Square extends React.Component {
  renderPiece(square) {
    if (square in this.props.state.pieces) {
     return (
       this.props.state.pieces[square].piece.unicode
     );
    }
  }

  render() {
    return (
      <button className={['square', this.props.color].join(' ')} onClick={() => this.props.onClick()}>
        {this.renderPiece(this.props.square)}
      </button>
    );
  }
}
