import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ascii from '../../common/Ascii';
import Pgn from '../../common/Pgn';
import Piece from '../../common/Piece';
import * as modeConst from '../../features/mode/modeConst';

const Squares = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const filterMove = () => {
    if (state.mode.name === modeConst.PLAY) {
      if (
        !state.mode.play.accepted ||
        state.board.isMate ||
        state.mode.play.draw ||
        state.mode.play.resign ||
        state.mode.play.leave ||
        state.mode.play.timer.over ||
        state.history.back !== 0
      ) {
        return false;
      }
      if (state.mode.play.accepted) {
        if (state.board.turn !== state.mode.play.color) {
          return false;
        }
      }
    } else if (state.mode.name !== modeConst.UNDEFINED) {
      if (
        state.board.isMate ||
        state.history.back !== 0
      ) {
        return false;
      }
    }

    return true;
  }

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
          ? payload = {
              ...payload,
              i: i,
              j: j,
              sq: Ascii.fromIndexToAlgebraic(
                i,
                j,
                state.board.size
              )
            }
          : payload = {
            ...payload,
            i: state.board.size.ranks - 1 - i,
            j: state.board.size.files - 1 - j,
            sq: Ascii.fromIndexToAlgebraic(
              state.board.size.ranks - 1 - i,
              state.board.size.files - 1 - j,
              state.board.size
            )
          };
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
            filterMove() ? props.handleMove(payload) : null;
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            filterMove() ? props.handleMove(payload) : null;
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
                    onDragStart={() => {
                      filterMove() ? props.handleMove(payload) : null;
                    }}
                  />
                : null
            }
        </div>
      });
    });
  }

  return (
    <div className={[props.className, state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {sqs()}
    </div>
  );
}

export default Squares;
