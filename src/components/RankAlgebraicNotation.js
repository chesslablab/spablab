import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  position: {
    textAlign: 'right',
    position: 'relative !important',
    top: '-9vh',
    paddingRight: '0.25vh',
    fontSize: '80%'
  },
});

const char = (square, flip) => {
  let squares = [];
  let char = '';
  if (flip === 'w') {
    squares = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
    ];
  } else {
    squares = [
      'a8', 'a7', 'a6', 'a5', 'a4', 'a3', 'a2', 'a1'
    ];
  }
  if (squares.includes(square)) {
    char = square.charAt(1);
  }

  return char;
};

const RankAlgebraicNotation = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  return (
    <span className={classes.position}>
      {char(props.square, state.board.flip)}
    </span>
  );
}

export default RankAlgebraicNotation;
