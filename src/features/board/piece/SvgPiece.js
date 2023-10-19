import SvgBlackArchbishop from 'features/board/piece/SvgBlackArchbishop';
import SvgBlackBishop from 'features/board/piece/SvgBlackBishop';
import SvgBlackChancellor from 'features/board/piece/SvgBlackChancellor';
import SvgBlackKing from 'features/board/piece/SvgBlackKing';
import SvgBlackKnight from 'features/board/piece/SvgBlackKnight';

export const Svg = ({ props }) => {
  if (props.unicode === ' a ') {
    return (
      <SvgBlackArchbishop />
    );
  } else if (props.unicode === ' b ') {
    return (
      <SvgBlackBishop />
    );
  } else if (props.unicode === ' c ') {
    return (
      <SvgBlackChancellor />
    );
  } else if (props.unicode === ' k ') {
    return (
      <SvgBlackKing />
    );
  } else if (props.unicode === ' n ') {
    return (
      <SvgBlackKnight />
    );
  }


  return null;
}

export const color = (piece) => {
  const pieces = {
    'w': [' A ', ' B ', ' C ', ' K ', ' N ', ' P ', ' Q ', ' R '],
    'b': [' a ', ' b ', ' c ', ' k ', ' n ', ' p ', ' q ', ' r ']
  };
  if (pieces['w'].includes(piece)) {
    return 'w';
  } else if (pieces['b'].includes(piece)) {
    return 'b';
  }

  return null;
}
