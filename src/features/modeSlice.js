import { createSlice } from '@reduxjs/toolkit';
import Pgn from '../common/Pgn';
import Wording from '../common/Wording.js';
import { modeName } from './modeConstant';

const initialState = {
  current: modeName.ANALYSIS,
  grandmaster: {
    color: null,
    movetext: null
  },
  play: {
    jwt: null,
    jwt_decoded: null,
    hash: null,
    color: null,
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
  }
};

const modeSlice = createSlice({
  name: 'mode',
  initialState: initialState,
  reducers: {
    modeSetAnalysis(state) {
      state = initialState;
    },
    modeSetGrandmaster(state) {
      state.current = modeName.GRANDMASTER;
      state.grandmaster.color = action.payload.color;
    },
    modeSetLoadFen(state) {
      state.current = modeName.LOADFEN;
    },
    modeSetLoadPgn(state) {
      state.current = modeName.LOADPGN;
    },
    modeSetPlay(state, action) {
      state.current = action.payload.current;
      state.play = action.payload.play;
    },
    modeGrandmasterMovetext(state, action) {
      state.grandmaster.movetext = action.payload.movetext;
    },
    modePlayAccept(state) {
      const expiryTimestamp = new Date();
      expiryTimestamp.setSeconds(
        expiryTimestamp.getSeconds() + parseInt(state.play.jwt_decoded.min) * 60
      );
      state.play.accepted = true;
      state.play.timer.expiry_timestamp = expiryTimestamp;
    },
    modePlayTakebackAccept(state) {
      state.play.takeback = Wording.verb.ACCEPT.toLowerCase();
    },
    modePlayTakebackDecline(state) {
      state.play.takeback = null;
    },
    modePlayTakebackPropose(state) {
      state.play.takeback = Wording.verb.PROPOSE.toLowerCase();
    },
    modePlayDrawAccept(state) {
      state.play.draw = Wording.verb.ACCEPT.toLowerCase();
    },
    modePlayDrawDecline(state) {
      state.play.draw = null;
    },
    modePlayDrawPropose(state) {
      state.play.draw = Wording.verb.PROPOSE.toLowerCase();
    },
    modePlayResignAccept(state) {
      state.play.resign = Wording.verb.ACCEPT.toLowerCase();
    },
    modePlayTimeOver(state, action) {
      state.play.timer.over = action.payload.color;
    },
    modePlayRematchAccept(state) {
      state.play.rematch = Wording.verb.ACCEPT.toLowerCase();
    },
    modePlayRematchDecline(state) {
      state.play.rematch = null;
    },
    modePlayRematchPropose(state) {
      state.play.rematch = Wording.verb.PROPOSE.toLowerCase();
    },
    modePlayLeaveAccept(state) {
      state.play.leave = Wording.verb.ACCEPT.toLowerCase();
    }
  }
});

export const {
  modeSetAnalysis,
  modeSetGrandmaster,
  modeSetLoadFen,
  modeSetLoadPgn,
  modeSetPlay,
  modeGrandmasterMovetext,
  modePlayAccept,
  modePlayTakebackAccept,
  modePlayTakebackDecline,
  modePlayTakebackPropose,
  modePlayDrawAccept,
  modePlayDrawDecline,
  modePlayDrawPropose,
  modePlayResignAccept,
  modePlayTimeOver,
  modePlayRematchAccept,
  modePlayRematchDecline,
  modePlayRematchPropose,
  modePlayLeaveAccept
} = modeSlice.actions;
export default modeSlice.reducer;
