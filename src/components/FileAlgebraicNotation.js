import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  position: {
    textAlign: 'left',
    position: 'relative !important',
    top: '6.1vh',
    paddingLeft: '0.3vh',
    fontSize: '80%'
  },
});

const char = (square, flip) => {
  let squares = [];
  let char = '';
  if (flip === 'w') {
    squares = [
      'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
    ];
  } else {
    squares = [
      'h8', 'g8', 'f8', 'e8', 'd8', 'c8', 'b8', 'a8'
    ];
  }
  if (squares.includes(square)) {
    char = square.charAt(0);
  }

  return char;
};

const FileAlgebraicNotation = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  return (
    <span className={classes.position}>
      {char(props.square, state.board.flip)}
    </span>
  );
}

export default FileAlgebraicNotation;
