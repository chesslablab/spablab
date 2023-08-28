import { useSelector } from 'react-redux';
import Pgn from 'common/Pgn';

const AlgebraicNotation = ({props}) => {
  const state = useSelector(state => state);
  
  const spans = [];

  if (props.i === state.board.size.ranks - 1 && state.board.flip === Pgn.symbol.WHITE) {
    spans.push(<span key={spans.length} className="file">
      {props.sq.charAt(0)}
    </span>
    );
  }

  if (props.j === 0 && state.board.flip === Pgn.symbol.WHITE) {
    spans.push(<span key={spans.length} className="rank">
      {props.sq.charAt(1)}
    </span>
    );
  }

  if (props.i === 0 && state.board.flip === Pgn.symbol.BLACK) {
    spans.push(<span key={spans.length} className="file">
      {props.sq.charAt(0)}
    </span>
    );
  }

  if (props.j === state.board.size.files - 1 && state.board.flip === Pgn.symbol.BLACK) {
    spans.push(<span key={spans.length} className="rank">
      {props.sq.charAt(1)}
    </span>
    );
  }

  return spans;
}

export default AlgebraicNotation;
