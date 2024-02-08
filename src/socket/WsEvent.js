import { Pgn } from '@chesslablab/reactblab';
import jwt_decode from 'jwt-decode';
import store from 'app/store';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as actionConst from 'features/mode/actionConst';
import * as fenMode from 'features/mode/fenModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as sanMode from 'features/mode/sanModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as heuristics from 'features/heuristicsSlice';
import multiAction from 'features/multiAction';
import * as stockfishEval from 'features/stockfishEvalSlice';
import * as tutorFen from 'features/tutorFenSlice';
import Ws from 'socket/Ws';

export default class WsEvent {
  static onStart = (data) => dispatch => {
    if (data['/start'].mode === modeConst.FEN) {
      dispatch(WsEvent.onStartFen(data));
    } else if (data['/start'].mode === modeConst.SAN) {
      dispatch(WsEvent.onStartSan(data));
    } else if (data['/start'].mode === modeConst.PLAY) {
      dispatch(WsEvent.onStartPlay(data));
    } else if (data['/start'].mode === modeConst.STOCKFISH) {
      dispatch(WsEvent.onStartStockfish(data));
    }
  }

  static onStartFen = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(board.start(data['/start']));
      dispatch(fenMode.set(data['/start']));
    } else {
      dispatch(warningAlert.show({
        msg: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartSan = (data) => dispatch => {
    if (data['/start'].movetext) {
      dispatch(board.startPgn(data['/start']));
      dispatch(sanMode.set(data['/start']));
      multiAction.openingByMovetext(dispatch, data['/start']);
    } else {
      dispatch(warningAlert.show({
        msg: 'Invalid SAN movetext, please try again with a different one.'
      }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    if (data['/start'].jwt) {
      dispatch(board.start(data['/start']));
      const jwtDecoded = jwt_decode(data['/start'].jwt);
      let payload = {
        variant: data['/start'].variant,
        play: {
          jwt: data['/start'].jwt,
          jwt_decoded: jwtDecoded,
          hash: data['/start'].hash,
          color: jwtDecoded.color,
        },
      };
      if (data['/start'].startPos) {
        payload.play.startPos = data['/start'].startPos;
      }
      dispatch(playMode.set(payload));
      if (jwtDecoded.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(infoAlert.show({ msg: 'Waiting for player to join...' }));
    } else {
      dispatch(warningAlert.show({
        msg: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartStockfish = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(board.start(data['/start']));
      if (data['/start'].color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
    } else {
      if (data['/start'].color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
        Ws.stockfish();
      }
    }
  }

  static onAccept = (data) => dispatch => {
    if (data['/accept'].jwt) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      const inviterColor = store.getState().playMode.play?.color;
      multiAction.initGui(dispatch);
      dispatch(board.start({
        variant: jwtDecoded.variant,
        fen: jwtDecoded.fen
      }));
      dispatch(playMode.set({
        active: true,
        variant: jwtDecoded.variant,
        accepted: true,
        fen: jwtDecoded.fen,
        startPos: jwtDecoded.startPos,
        timer: data['/accept'].timer,
        play: {
          jwt: data['/accept'].jwt,
          jwt_decoded: jwt_decode(data['/accept'].jwt),
          hash: data['/accept'].hash,
          color: inviterColor ?? (jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE),
        },
      }));
      if (store.getState().playMode.play.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
    } else {
      dispatch(warningAlert.show({
        msg: 'Invalid invite code, please try again with a different one.'
      }));
    }
  }

  static onLegal = (data) => dispatch => {
    if (data['/legal']) {
      dispatch(board.legal(data['/legal']));
    }
  }

  static onPlayLan = (data) => dispatch => {
    if (data['/play_lan'].fen) {
      dispatch(board.validMove(data['/play_lan']));
      if (store.getState().playMode.active) {
        dispatch(playMode.timer(data['/play_lan'].timer));
        if (store.getState().playMode.play.color === data['/play_lan'].turn) {
          dispatch(board.playLan());
        }
      } else if (store.getState().stockfishMode.active) {
        Ws.stockfish();
      }
      multiAction.openingByMovetext(dispatch, data['/play_lan']);
      Ws.heuristics();
      Ws.stockfishEval();
      Ws.tutorFen();
    }
  }

  static onUndo = (data) => dispatch => {
    if (data['/undo']) {
      dispatch(board.undo(data['/undo']));
      multiAction.openingByMovetext(dispatch, data['/undo']);
      Ws.heuristics();
      Ws.stockfishEval();
      Ws.tutorFen();
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(heuristics.set(data['/heuristics']));
  }

  static onTakeback = (data) => dispatch => {
    if (data['/takeback'].action === actionConst.PROPOSE) {
      if (
        !store.getState().playMode.takeback ||
        store.getState().playMode.takeback ===  actionConst.DECLINE
      ) {
        dispatch(playMode.acceptTakebackDialog({ open: true }));
      }
    } else if (data['/takeback'].action === actionConst.ACCEPT) {
      dispatch(playMode.acceptTakeback());
      dispatch(infoAlert.show({ msg: 'Takeback accepted.' }));
    } else if (data['/takeback'].action === actionConst.DECLINE) {
      dispatch(playMode.declineTakeback());
      dispatch(infoAlert.show({ msg: 'Takeback declined.' }));
    }
  }

  static onDraw = (data) => dispatch => {
    if (data['/draw'].action === actionConst.PROPOSE) {
      if (!store.getState().playMode.draw) {
        dispatch(playMode.acceptDrawDialog({ open: true }));
      }
    } else if (data['/draw'].action === actionConst.ACCEPT) {
      dispatch(playMode.acceptDraw());
      dispatch(infoAlert.show({ msg: 'Draw offer accepted.' }));
    } else if (data['/draw'].action === actionConst.DECLINE) {
      dispatch(playMode.declineDraw());
      dispatch(infoAlert.show({ msg: 'Draw offer declined.' }));
    }
  }

  static onResign = (data) => dispatch => {
    if (data['/resign'].action === actionConst.ACCEPT) {
      dispatch(playMode.acceptResign());
      dispatch(infoAlert.show({ msg: 'Chess game resigned.' }));
    }
  }

  static onRematch = (data) => dispatch => {
    if (data['/rematch'].action === actionConst.PROPOSE) {
      if (!store.getState().playMode.rematch) {
        dispatch(playMode.acceptRematchDialog({ open: true }));
      }
    } else if (data['/rematch'].action === actionConst.ACCEPT) {
      dispatch(playMode.acceptRematch());
      Ws.restart();
    } else if (data['/rematch'].action === actionConst.DECLINE) {
      dispatch(playMode.declineRematch());
      dispatch(infoAlert.show({ msg: 'Rematch declined.' }));
    }
  }

  static onLeave = (data) => dispatch => {
    if (data['/leave'].action === actionConst.ACCEPT) {
      dispatch(playMode.acceptLeave());
      dispatch(infoAlert.show({ msg: 'Your opponent left the game.' }));
    }
  }

  static onRestart = (data) => dispatch => {
    dispatch(WsEvent.onAccept({
      '/accept': data['/restart'],
    }));
  }

  static onRandomizer = (data) => dispatch => {
    if (data['/randomizer'].fen) {
      dispatch(stockfishMode.set({
        variant: variantConst.CLASSICAL,
        computer: {
          color: data['/randomizer'].turn,
          options: {
            "Skill Level": 20
          },
          params: {
            "depth": 12
          },
        },
      }));
      Ws.start(
        variantConst.CLASSICAL,
        modeConst.STOCKFISH,
        { fen: data['/randomizer'].fen }
      );
    } else {
      dispatch(warningAlert.show({ msg: 'Whoops! A random chess position could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.stockfish(data['/stockfish']));
      Ws.heuristics();
      Ws.stockfishEval();
      Ws.tutorFen();
      multiAction.openingByMovetext(dispatch, data['/stockfish']);
    }
  }

  static onStockfishEval = (data) => dispatch => {
    dispatch(stockfishEval.set(data['/stockfish_eval']));
  }

  static onTutorFen = (data) => dispatch => {
    dispatch(tutorFen.set(data['/tutor_fen']));
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(playMode.playOnlineDialog({ open: true }));
    dispatch(playMode.playOnlineTable(data['/online_games']));
  }

  static onError = (data) => dispatch => {
    if (data['error']) {
      dispatch(warningAlert.show({
        msg: 'Whoops! Something went wrong.'
      }));
    }
  }
}
