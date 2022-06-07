import { createSlice } from '@reduxjs/toolkit';
import Wording from '../common/Wording.js';
import { modeName } from './modeConstant';

const initialState = {
  name: modeName.ANALYSIS
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    modeStartAnalysis: () => initialState,
    modeStartLoadFen: () => { name: modeName.LOADFEN },
    modeStartLoadPgn: () => { name: modeName.LOADPGN },
    modeSetGrandmaster(state, action) {
      state.name = modeName.GRANDMASTER;
      state.grandmaster = action.payload;
    },
    modeSetPlay(state, action) {
      state.name = modeName.PLAY;
      state.play = action.payload;
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
      state.play.timer = {
        expiry_timestamp: expiryTimestamp,
        over: null
      };
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
  modeStartAnalysis,
  modeSetGrandmaster,
  modeStartLoadFen,
  modeStartLoadPgn,
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
