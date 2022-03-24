import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  position: {
    textAlign: 'right',
    position: 'relative !important',
    top: '5.8vh'
  },
});

const char = (square, flip) => {
  let squares = [];
  let char = '';
  if (flip === 'w') {
    squares = [
      'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
      'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
    ];
  } else {
    squares = [
      'h8', 'g8', 'f8', 'e8', 'd8', 'c8', 'b8', 'a8',
      'a7', 'a6', 'a5', 'a4', 'a3', 'a2', 'a1'
    ];
  }
  if (squares.includes(square)) {
    flip === 'w' ? char = square.charAt(0) : char = square.charAt(1);
  }

  return char;
};

const SquareAlgebraicNotation = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  return (
    <span className={classes.position}>
      {char(props.square, state.board.flip)}
    </span>
  );
}

export default SquareAlgebraicNotation;
