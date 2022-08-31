import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import * as modeConst from '../common/constants/mode';
import Ascii from '../common/Ascii';
import Pgn from '../common/Pgn';
import Piece from '../common/Piece';
import * as boardSlice from '../features/boardSlice';
import WsAction from '../ws/WsAction';

const Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const maxWidth900 = useMediaQuery("(max-width:900px)");
  const maxWidth600 = useMediaQuery("(max-width:600px)");

  let sqSize = maxWidth600 ? 12 : maxWidth900 ? 10 : 4.1;

  let r = document.querySelector(':root');
  r.style.setProperty('--sqSize', `${sqSize}vw`);

  const animation = (color, flip) => {
    const lan = Ascii.longAlgebraicNotation(
      state.board.history[state.board.history.length - 2 + state.history.back],
      state.board.history[state.board.history.length - 1 + state.history.back]
    );
    const sqDiff = Ascii.sqDiff(lan[0], lan[1]);
    const xAxis = Ascii.xAxisSign(lan[0], lan[1], color, flip) * (sqSize * sqDiff.files);
    const yAxis = Ascii.yAxisSign(lan[0], lan[1], color, flip) * (sqSize * sqDiff.ranks);

    r.style.setProperty('--xAxis', `${xAxis}vw`);
    r.style.setProperty('--yAxis', `${yAxis}vw`);

    const hiddenImg = document.querySelector(`.${lan[1]}`).querySelector('img');
    hiddenImg.classList.add('hidden');

    const unicode = hiddenImg.getAttribute('data-unicode');

    const animatedImg = document.createElement('img');
    animatedImg.setAttribute('src', Piece.unicode[unicode].char);
    animatedImg.addEventListener('transitionend', () => {
      clearAnimation();
    });

    const sq = document.querySelector(`.${lan[0]}`);
    sq.appendChild(animatedImg);

    getComputedStyle(document.documentElement).getPropertyValue('--xAxis');
    getComputedStyle(document.documentElement).getPropertyValue('--yAxis');

    animatedImg.classList.add('moved');
  };

  const clearAnimation = () => {
    document.querySelectorAll('.hidden').forEach((el) => el.classList.remove('hidden'));
    document.querySelectorAll('.moved').forEach((el) => el.remove());
  }

  useEffect(() => {
    dispatch(WsAction.connect(state, props)).then(ws => WsAction.startAnalysis(ws));
  }, [dispatch]);

  useEffect(() => {
    if (isInitialMount.name) {
      isInitialMount.name = false;
    } else {
      if (state.board.movetext) {
        if (state.mode.name === modeConst.STOCKFISH) {
          if (state.mode.computer.color === state.board.turn) {
            animation(state.mode.computer.color, state.board.flip);
          }
        } else if (state.mode.name === modeConst.PLAY) {
          if (state.mode.play.color === state.board.turn) {
            animation(state.mode.play.color, state.board.flip);
          }
        }
      }
    }
  }, [state.board.history.length]);

  const handleMove = (payload) => {
    if (state.mode.name === modeConst.PLAY) {
      if (
        !state.board.isMate &&
        !state.mode.play.draw &&
        !state.mode.play.resign &&
        !state.mode.play.leave &&
        !state.mode.play.timer.over &&
        state.history.back === 0
      ) {
        if (state.board.picked && state.board.turn !== Piece.color(payload.piece)) {
          dispatch(boardSlice.leavePiece(payload));
        } else if (state.mode.play.accepted) {
          if (state.mode.play.color === state.board.turn) {
            if (state.board.turn === Piece.color(payload.piece)) {
              dispatch(boardSlice.pickPiece(payload));
              WsAction.legalSqs(state, payload.sq);
            }
          }
        }
      }
    } else if (state.mode.name !== modeConst.UNDEFINED) {
      if (
        !state.board.isMate &&
        state.history.back === 0
      ) {
        if (state.board.picked && state.board.turn !== Piece.color(payload.piece)) {
          dispatch(boardSlice.leavePiece(payload));
        } else if (state.board.turn === Piece.color(payload.piece)) {
          dispatch(boardSlice.pickPiece(payload));
          WsAction.legalSqs(state, payload.sq);
        }
      }
    }
  };

  const board = () => {
    let divs = [];
    let color;
    Ascii.flip(
      state.board.flip,
      state.board.history[state.board.history.length - 1 + state.history.back]
    ).forEach((rank, i) => {
      rank.forEach((piece, j) => {
          let payload = { piece: piece };
          let isLegal, isSelected, isCheck = '';
          (i + j) % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
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
          divs.push(
            <div
              key={'' + i + j}
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
                handleMove(payload);
              }}
              onDrop={(ev) => {
                ev.preventDefault();
                handleMove(payload);
              }}
              onDragOver={(ev) => {
                ev.preventDefault();
              }}>
                {
                  Piece.unicode[piece].char
                    ? <img
                        data-unicode={piece}
                        src={Piece.unicode[piece].char}
                        draggable={Piece.color(piece) === state.board.turn ? true : false}
                        onDragStart={() => handleMove(payload)}
                      />
                    : null
                }
            </div>
          );
      });
    });

    return divs;
  }

  return (
    <div className={['board', state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {board()}
    </div>
  );
}

export default Board;
