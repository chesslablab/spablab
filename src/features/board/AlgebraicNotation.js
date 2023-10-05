import { useSelector } from 'react-redux';
import Pgn from 'common/Pgn';

const AlgebraicNotation = ({props}) => {
  const state = useSelector(state => state.board);

  const spans = [];

  if (props.i === state.size.ranks - 1 && state.flip === Pgn.symbol.WHITE) {
    spans.push(<span key={spans.length} className="file">
      {props.sq.charAt(0)}
    </span>
    );
  }

  if (props.j === 0 && state.flip === Pgn.symbol.WHITE) {
    spans.push(<span key={spans.length} className="rank">
      {props.sq.charAt(1)}
    </span>
    );
  }

  if (props.i === 0 && state.flip === Pgn.symbol.BLACK) {
    spans.push(<span key={spans.length} className="file">
      {props.sq.charAt(0)}
    </span>
    );
  }

  if (props.j === state.size.files - 1 && state.flip === Pgn.symbol.BLACK) {
    spans.push(<span key={spans.length} className="rank">
      {props.sq.charAt(1)}
    </span>
    );
  }

  return spans;
}

export default AlgebraicNotation;
