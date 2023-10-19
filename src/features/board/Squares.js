import { useSelector } from 'react-redux';
import Ascii from 'common/Ascii';
import Pgn from 'common/Pgn';
import Piece from 'common/Piece';
import AlgebraicNotation from 'features/board/AlgebraicNotation';
import * as SvgPiece from 'features/board/piece/SvgPiece';
import * as eventConst from 'features/eventConst';

const Squares = ({ props }) => {
  const statePlayMode = useSelector(state => state.playMode);

  const stateRavMode = useSelector(state => state.ravMode);

  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const filterMove = () => {
    if (stateRavMode.active) {
      return false;
    } else if (statePlayMode.active) {
      if (
        !statePlayMode.accepted ||
        stateBoard.isMate ||
        stateBoard.isStalemate ||
        statePlayMode.draw ||
        statePlayMode.resign ||
        statePlayMode.leave ||
        statePlayMode.timeOut ||
        statePanel.history.back !== 0
      ) {
        return false;
      }
      if (statePlayMode.accepted) {
        if (stateBoard.turn !== statePlayMode.play.color) {
          return false;
        }
      }
    } else {
      if (
        stateBoard.isMate ||
        stateBoard.isStalemate ||
        statePanel.history.back !== 0
      ) {
        return false;
      }
    }

    return true;
  }

  const sqs = () => {
    const fen = stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back].split(' ');
    const ascii = Ascii.toAscii(fen[0]);
    return Ascii.flip(
      stateBoard.flip,
      ascii
    ).map((rank, i) => {
      return rank.map((piece, j) => {
        let payload = { piece: piece };
        let isLegal, isSelected, isCheck = '';
        let color = (i + j) % 2 !== 0 ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        stateBoard.flip === Pgn.symbol.WHITE
          ? payload = {
              ...payload,
              i: i,
              j: j,
              sq: Ascii.fromIndexToAlgebraic(i, j, stateBoard.size)
            }
          : payload = {
            ...payload,
            i: stateBoard.size.ranks - 1 - i,
            j: stateBoard.size.files - 1 - j,
            sq: Ascii.fromIndexToAlgebraic(
              stateBoard.size.ranks - 1 - i,
              stateBoard.size.files - 1 - j,
              stateBoard.size
            )
          };
        if (stateBoard.pieceGrabbed) {
          if (stateBoard.pieceGrabbed.sq === payload.sq) {
            isSelected = 'isSelected';
          }
          if (stateBoard.pieceGrabbed.fen) {
            if (Object.keys(stateBoard.pieceGrabbed.fen).includes(payload.sq)) {
              isLegal = 'isLegal';
            }
          }
        } else if (stateBoard.isCheck) {
          if (stateBoard.turn === Pgn.symbol.WHITE) {
            if (piece === ' K ') {
              isCheck = 'isCheck';
            }
          } else if (stateBoard.turn === Pgn.symbol.BLACK) {
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
                ascii: stateBoard?.pieceGrabbed?.ascii,
                event: eventConst.ON_MOUSE_DOWN
              };
              props.handleMove(payload);
            }
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            if (filterMove()) {
              payload.piecePlaced = {
                ascii: stateBoard?.pieceGrabbed?.ascii,
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
                    draggable={SvgPiece.color(piece) === stateBoard.turn ? true : false}
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
    <div className={[props.className, statePanel.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {sqs()}
    </div>
  );
}

export default Squares;
