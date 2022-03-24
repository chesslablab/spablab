import React from 'react';
import FileAlgebraicNotation from './FileAlgebraicNotation';
import RankAlgebraicNotation from './RankAlgebraicNotation';

const SquareAlgebraicNotation = ({props}) => {
  return (
    <div>
      <FileAlgebraicNotation props={{ square: props.square }} />
      <RankAlgebraicNotation props={{ square: props.square }} />
    </div>
  );
}

export default SquareAlgebraicNotation;
