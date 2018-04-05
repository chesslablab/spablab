import React from 'react';

export default class Square extends React.Component {
  renderPiece(square) {
    if (square in this.props.state.pieces) {
      return (
        this.props.state.pieces[square].unicode
      );
    }
    else {
      return (
        ' '
      );
    }
  }

  render() {
    return (
      <div className={['square', this.props.color].join(' ')} onClick={() => this.props.onClick()}>
        <span className={this.props.state.pieces[this.props.square] === undefined ? 'empty' : ''} >
          {this.renderPiece(this.props.square)}
        </span>
      </div>
    );
  }
}
