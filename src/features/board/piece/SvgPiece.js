import SvgBlackArchbishop from 'features/board/piece/SvgBlackArchbishop';
import SvgBlackBishop from 'features/board/piece/SvgBlackBishop';
import SvgBlackChancellor from 'features/board/piece/SvgBlackChancellor';

export const SvgPiece = () => {

  return (
    <SvgBlackBishop />
  );
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
