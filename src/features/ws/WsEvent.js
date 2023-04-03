import jwt_decode from "jwt-decode";
import store from '../../app/store';
import Pgn from '../../common/Pgn';
import Dispatcher from '../../common/Dispatcher';
import * as heuristicsBar from '../../features/heuristicsBarSlice';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as board from '../../features/board/boardSlice';
import * as acceptDrawDialog from '../../features/dialog/acceptDrawDialogSlice';
import * as acceptRematchDialog from '../../features/dialog/acceptRematchDialogSlice';
import * as acceptTakebackDialog from '../../features/dialog/acceptTakebackDialogSlice';
import * as createInviteCodeDialog from '../../features/dialog/createInviteCodeDialogSlice';
import * as heuristicsDialog from '../../features/dialog/heuristicsDialogSlice';
import * as playOnlineDialog from '../../features/dialog/playOnlineDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as modeConst from '../../features/mode/modeConst';
import * as mode from '../../features/mode/modeSlice';
import * as gameTable from '../../features/table/gameTableSlice';
import * as variantConst from '../../features/variant/variantConst';
import * as variant from '../../features/variant/variantSlice';
import WsAction from '../../features/ws/WsAction';

export default class WsEvent {
  static onStartAnalysis = (data) => dispatch => {
    dispatch(mode.startAnalysis());
    if (data['/start'].variant === variantConst.CHESS_960) {
      dispatch(board.startChess960({ fen: data['/start'].fen }));
      dispatch(variant.startChess960({
        fen: data['/start'].fen,
        startPos: data['/start'].startPos
      }));
    } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
      dispatch(board.startCapablanca80({ fen: data['/start'].fen }));
      dispatch(variant.startCapablanca80());
    }
  }

  static onStartGm = (data) => dispatch => {
    dispatch(mode.setGm({
      color: data['/start'].color,
      movetext: null
    }));
  }

  static onStartFen = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(mode.setFen({ fen: data['/start'].fen }));
      dispatch(board.startFen({ fen: data['/start'].fen }));
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(variant.startClassical());
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(variant.startChess960({
          fen: data['/start'].fen,
          startPos: data['/start'].startPos
        }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(variant.startCapablanca80());
      }
      WsAction.heuristicsBar(
          store.getState(),
          store.getState().board.fen[store.getState().board.fen.length - 1],
          store.getState().variant.name
      );
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartPgn = (data) => dispatch => {
    if (data['/start'].movetext) {
      dispatch(mode.startPgn());
      dispatch(board.startPgn({
        turn: data['/start'].turn,
        movetext: data['/start'].movetext,
        fen: data['/start'].fen,
        history: data['/start'].history
      }));
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(variant.startClassical());
        Dispatcher.openingAnalysisBySameMovetext(dispatch, data['/start'].movetext);
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(variant.startChess960({
          startPos: data['/start'].startPos
        }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(variant.startCapablanca80());
      }
      WsAction.heuristicsBar(
          store.getState(),
          store.getState().board.fen[store.getState().board.fen.length - 1],
          store.getState().variant.name
      );
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid PGN movetext, please try again with a different one.'
      }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['/start'].jwt) {
      const jwtDecoded = jwt_decode(data['/start'].jwt);
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(variant.startClassical());
        dispatch(board.startFen({ fen: data['/start'].fen }));
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(variant.startChess960({
          fen: data['/start'].fen,
          startPos: data['/start'].startPos
        }));
        dispatch(board.startChess960({ fen: data['/start'].fen }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(variant.startCapablanca80());
        dispatch(board.startCapablanca80({ fen: data['/start'].fen }));
      }
      dispatch(mode.setPlay({
        jwt: data['/start'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/start'].hash,
        color: jwtDecoded.color,
        takeback: null,
        draw: null,
        resign: null,
        rematch: null,
        leave: null,
        accepted: false,
        timer: {
          expiry_timestamp: null,
          over: null
        }
      }));
      if (jwtDecoded.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(infoAlert.show({ info: 'Waiting for player to join...' }));
    } else {
      dispatch(createInviteCodeDialog.close());
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartStockfishByColor = (data) => dispatch => {
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
      WsAction.stockfish(store.getState());
    }
  }

  static onStartStockfishByFen = (data) => dispatch => {
    dispatch(board.startFen({ fen: data['/start'].fen }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
    WsAction.heuristicsBar(
        store.getState(),
        store.getState().board.fen[store.getState().board.fen.length - 1],
        store.getState().variant.name
    );
  }

  static onStart = (data) => dispatch => {
    dispatch(progressDialog.close());
    if (data['/start'].mode === modeConst.ANALYSIS) {
      dispatch(WsEvent.onStartAnalysis(data));
    } else if (data['/start'].mode === modeConst.GM) {
      dispatch(WsEvent.onStartGm(data));
    } else if (data['/start'].mode === modeConst.FEN) {
      dispatch(WsEvent.onStartFen(data));
    } else if (data['/start'].mode === modeConst.PGN) {
      dispatch(WsEvent.onStartPgn(data));
    } else if (data['/start'].mode === modeConst.PLAY) {
      dispatch(WsEvent.onStartPlay(data));
    } else if (data['/start'].mode === modeConst.STOCKFISH) {
      if (data['/start'].fen) {
        dispatch(WsEvent.onStartStockfishByFen(data));
      } else {
        dispatch(WsEvent.onStartStockfishByColor(data));
      }
    }
  }

  static onAccept = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['/accept'].jwt) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      if (jwtDecoded.variant === variantConst.CLASSICAL) {
        dispatch(variant.startClassical());
        dispatch(board.startFen({ fen: jwtDecoded.fen }));
      } else if (jwtDecoded.variant === variantConst.CHESS_960) {
        dispatch(variant.startChess960({
          fen: jwtDecoded.fen,
          startPos: jwtDecoded.startPos
        }));
        dispatch(board.startChess960({ fen: jwtDecoded.fen }));
      } else if (jwtDecoded.variant === variantConst.CAPABLANCA_80) {
        dispatch(variant.startCapablanca80());
        dispatch(board.startCapablanca80({ fen: jwtDecoded.fen }));
      }
      if (!store.getState().mode.play) {
        dispatch(mode.setPlay({
          jwt: data['/accept'].jwt,
          jwt_decoded: jwt_decode(data['/accept'].jwt),
          hash: data['/accept'].hash,
          color: jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE,
          takeback: null,
          draw: null,
          resign: null,
          rematch: null,
          leave: null,
          accepted: false,
          timer: {
            expiry_timestamp: null,
            over: null
          }
        }));
      }
      if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(mode.acceptPlay());
      dispatch(playOnlineDialog.close());
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid invite code, please try again with a different one.'
      }));
    }
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(playOnlineDialog.refresh(data['/online_games']));
  }

  static onLegalSqs = (data) => dispatch => {
    dispatch(board.legalSqs({
      piece: data['/legal_sqs'].identity,
      position: data['/legal_sqs'].position,
      sqs: data['/legal_sqs'].sqs,
      en_passant: data['/legal_sqs'].enPassant ? data['/legal_sqs'].enPassant : ''
    }));
  }

  static onPlayLan = (props, data) => dispatch => {
    const payload = {
      isCheck: data['/play_lan'].isCheck,
      isMate: data['/play_lan'].isMate,
      movetext: data['/play_lan'].movetext,
      fen: data['/play_lan'].fen
    };
    if (data['/play_lan'].isLegal) {
      if (data['/play_lan'].pgn === Pgn.symbol.CASTLING_LONG) {
        dispatch(board.castleLong(payload));
      } else if (data['/play_lan'].pgn === Pgn.symbol.CASTLING_SHORT) {
        dispatch(board.castleShort(payload));
      } else {
        dispatch(board.validMove(payload));
      }
      if (
        store.getState().variant.name === variantConst.CLASSICAL &&
        store.getState().mode.name === modeConst.ANALYSIS
      ) {
        Dispatcher.openingAnalysisByMovetext(dispatch, payload.movetext);
      } else if (
        store.getState().variant.name === variantConst.CLASSICAL &&
        store.getState().mode.name === modeConst.GM
      ) {
        dispatch(infoAlert.close());
        dispatch(progressDialog.open());
        fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/grandmaster`, {
          method: 'POST',
          body: JSON.stringify({
            movetext: data['/play_lan'].movetext
          })
        }).then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              const game = data[0];
              dispatch(mode.setGm({
                color: Pgn.symbol.WHITE,
                movetext: game.movetext
              }));
              dispatch(gameTable.show({
                game: {
                  Event: game.Event,
                  Site: game.Site,
                  Date: game.Date,
                  White: game.White,
                  Black: game.Black,
                  'White ELO': game.WhiteElo,
                  'Black ELO': game.BlackElo,
                  Result: game.Result,
                  ECO: game.ECO
                }
              }));
            });
          } else if (res.status === 204) {
            dispatch(gameTable.close());
            dispatch(infoAlert.show({
              info: 'This game was not found in the database, please try again with a different one.'
            }));
          }
        })
        .catch(error => {
          dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
        })
        .finally(() => {
          dispatch(progressDialog.close());
        });
      } else if (
        store.getState().variant.name === variantConst.CLASSICAL &&
        store.getState().mode.name === modeConst.STOCKFISH
      ) {
        dispatch(progressDialog.open());
        WsAction.stockfish(store.getState());
      }
      WsAction.heuristicsBar(
          store.getState(),
          store.getState().board.fen[store.getState().board.fen.length - 1],
          store.getState().variant.name
      );
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(heuristicsDialog.open({
      dimensions: data['/heuristics'].dimensions,
      balance: data['/heuristics'].balance
    }));
  }

  static onHeuristicsBar = (data) => dispatch => {
    dispatch(heuristicsBar.updateBar({
      dimensions: data['/heuristics_bar'].dimensions,
      balance: data['/heuristics_bar'].balance
    }));
  }

  static onTakebackPropose = () => dispatch => {
    if (!store.getState().mode.play.takeback) {
      dispatch(acceptTakebackDialog.open());
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch(mode.acceptTakeback());
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch(acceptDrawDialog.open());
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(mode.acceptDraw());
    dispatch(infoAlert.show({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(mode.declineDraw());
    dispatch(infoAlert.show({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(board.undo(data['/undo']));
    if (data['/undo'].mode === modeConst.PLAY) {
      dispatch(mode.declineTakeback());
    } else if (data['/undo'].mode === modeConst.ANALYSIS) {
      Dispatcher.openingAnalysisByMovetext(dispatch, data['/undo'].movetext);
      WsAction.heuristicsBar(
          store.getState(),
          store.getState().board.fen[store.getState().board.fen.length - 1],
          store.getState().variant.name
      );
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch(mode.acceptResign());
    dispatch(infoAlert.show({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch(acceptRematchDialog.open());
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(mode.acceptRematch());
    dispatch(infoAlert.show({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(mode.declineRematch());
    dispatch(infoAlert.show({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(mode.acceptLeave());
    dispatch(infoAlert.show({ info: 'Your opponent left the game.' }));
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch(mode.setPlay({
      color: store.getState().mode.play.color,
      accepted: false
    }));
    dispatch(mode.setPlay({
      jwt: data['/restart'].jwt,
      jwt_decoded: jwtDecoded,
      hash: data['/restart'].hash,
      color: store.getState().mode.play.color,
      takeback: null,
      draw: null,
      resign: null,
      rematch: null,
      accepted: true,
      timer: {
        expiry_timestamp: expiryTimestamp,
        over: null
      }
    }));
    dispatch(board.start());
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
  }

  static onRandomCheckmate = (data) => dispatch => {
    if (data['/randomizer'].fen) {
      dispatch(mode.setStockfish({
        color: data['/randomizer'].turn,
        options: {
          "Skill Level": 20
        },
        params: {
          "depth": 12
        }
      }));
      WsAction.start(
        store.getState(),
        variantConst.CLASSICAL,
        modeConst.STOCKFISH,
        { fen: data['/randomizer'].fen }
      );
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({ info: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.gm({
        turn: data['/stockfish'].state.turn,
        isCheck: data['/stockfish'].state.isCheck,
        isMate: data['/stockfish'].state.isMate,
        movetext: data['/stockfish'].state.movetext,
        fen: data['/stockfish'].state.fen
      }));
      WsAction.heuristicsBar(
          store.getState(),
          store.getState().board.fen[store.getState().board.fen.length - 1],
          store.getState().variant.name
      );
      Dispatcher.openingAnalysisByMovetext(dispatch, data['/stockfish'].state.movetext);
    }
  }

  static onValidate = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['validate']) {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Whoops! Something went wrong, please try again with different data.'
      }));
    }
  }
}
