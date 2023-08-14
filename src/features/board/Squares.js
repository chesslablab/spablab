import React from 'react';
import { useSelector } from 'react-redux';
import Ascii from 'common/Ascii';
import Pgn from 'common/Pgn';
import Piece from 'common/Piece';
import AlgebraicNotation from 'features/board/AlgebraicNotation';
import * as eventConst from 'features/eventConst';

const Squares = ({props}) => {
  const state = useSelector(state => state);

  const filterMove = () => {
    if (state.ravMode.active) {
      return false;
    } else if (state.playMode.active) {
      if (
        !state.playMode.accepted ||
        state.board.isMate ||
        state.board.isStalemate ||
        state.playMode.draw ||
        state.playMode.resign ||
        state.playMode.leave ||
        state.playMode.timeOut ||
        state.panel.history.back !== 0
      ) {
        return false;
      }
      if (state.playMode.accepted) {
        if (state.board.turn !== state.playMode.play.color) {
          return false;
        }
      }
    } else {
      if (
        state.board.isMate ||
        state.board.isStalemate ||
        state.panel.history.back !== 0
      ) {
        return false;
      }
    }

    return true;
  }

  const sqs = () => {
    const fen = state.board.fen[state.board.fen.length - 1 + state.panel.history.back].split(' ');
    const ascii = Ascii.toAscii(fen[0]);
    return Ascii.flip(
      state.board.flip,
      ascii
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
        if (state.board.pieceGrabbed) {
          if (state.board.pieceGrabbed.sq === payload.sq) {
            isSelected = 'isSelected';
          }
          if (state.board.pieceGrabbed.fen) {
            if (Object.keys(state.board.pieceGrabbed.fen).includes(payload.sq)) {
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
          onMouseDown={() => {
            if (filterMove()) {
              payload.piecePlaced = {
                ascii: state.board?.pieceGrabbed?.ascii,
                event: eventConst.ON_MOUSE_DOWN
              };
              props.handleMove(payload);
            }
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            if (filterMove()) {
              payload.piecePlaced = {
                ascii: state.board?.pieceGrabbed?.ascii,
                event: eventConst.ON_DROP
              };
              props.handleMove(payload);
            }
          }}
          onContextMenu={(ev)=>{
            ev.preventDefault();
            ev.target.classList.toggle('square-right-clicked');
          }}
          onDragOver={(ev) => {
            ev.preventDefault();
          }}>
            {
              Piece.unicode[piece].char
                ? <img
                    alt={Piece.unicode[piece].char}
                    ref={el => props.imgsRef.current[payload.sq] = el}
                    src={Piece.unicode[piece].char}
                    draggable={Piece.color(piece) === state.board.turn ? true : false}
                    onDragStart={() => {
                      if (filterMove()) {
                        payload.piecePlaced = { event: eventConst.ON_DRAG_START };
                        props.handleMove(payload);
                      }
                    }}
                  />
                : null
            }
            <AlgebraicNotation props={payload} />
        </div>
      });
    });
  }

  return (
    <div className={[props.className, state.panel.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {sqs()}
    </div>
  );
}

export default Squares;
