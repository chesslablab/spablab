import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ascii from '../../common/Ascii';
import Pgn from '../../common/Pgn';
import Piece from '../../common/Piece';

const Squares = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const sqs = () => {
    return Ascii.flip(
      state.board.flip,
      state.board.history[state.board.history.length - 1 + state.history.back]
    ).map((rank, i) => {
      return rank.map((piece, j) => {
        let payload = { piece: piece };
        let isLegal, isSelected, isCheck = '';
        let color = (i + j) % 2 !== 0 ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        state.board.flip === Pgn.symbol.WHITE
          ? payload = {...payload, i: i, j: j, sq: Ascii.fromIndexToAlgebraic(i, j)}
          : payload = {...payload, i: 7 - i, j: 7 - j, sq: Ascii.fromIndexToAlgebraic(7 - i, 7 - j)};
        if (state.board.picked) {
          if (state.board.picked.sq === payload.sq) {
            isSelected = 'isSelected';
          }
          if (state.board.picked.legal_sqs) {
            if (state.board.picked.legal_sqs.includes(payload.sq)) {
              isLegal = 'isLegal';
            }
          }
        } else if (state.board.isCheck) {
          if (state.board.turn === Pgn.symbol.WHITE) {
            if (piece === ' K ') {
              isCheck = 'isCheck';
            }
          } else if (state.board.turn === Pgn.symbol.BLACK) {
            if (piece === ' k ') {
              isCheck = 'isCheck';
            }
          }
        }

        return <div
          key={payload.sq}
          ref={el => props.sqsRef.current[payload.sq] = el}
          className={[
              'sq',
              color,
              payload.sq,
              isLegal,
              isSelected,
              isCheck
            ].join(' ')
          }
          onClick={() => {
            props.handleMove(payload);
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            props.handleMove(payload);
          }}
          onDragOver={(ev) => {
            ev.preventDefault();
          }}>
            {
              Piece.unicode[piece].char
                ? <img
                    ref={el => props.imgsRef.current[payload.sq] = el}
                    src={Piece.unicode[piece].char}
                    draggable={Piece.color(piece) === state.board.turn ? true : false}
                    onDragStart={() => props.handleMove(payload)}
                  />
                : null
            }
        </div>
      });
    });
  }

  return (
    <div className={['board', state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {sqs()}
    </div>
  );
}

export default Squares;
