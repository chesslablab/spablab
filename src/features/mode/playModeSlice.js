import { createSlice } from '@reduxjs/toolkit';
import Wording from 'common/Wording.js';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  takeback: null,
  draw: null,
  resign: null,
  rematch: null,
  leave: null,
  timeOut: false,
  dialogs: {
    acceptDraw: {
      open: false,
    },
    acceptRematch: {
      open: false,
    },
    acceptResign: {
      open: false,
    },
    acceptTakeback: {
      open: false,
    },
    createInviteCode: {
      open: false,
    },
    enterInviteCode: {
      open: false,
    },
    offerDraw: {
      open: false,
    },
    offerRematch: {
      open: false,
    },
    offerTakeback: {
      open: false,
    },
    playOnline: {
      open: false,
      rows: [],
    },
  },
  timer: {
    w: 0,
    b: 0,
  },
};

const playModeSlice = createSlice({
  name: 'playMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.fen =  action.payload.fen;
      state.startPos =  action.payload.startPos;
      state.play = action.payload.play;
    },
    acceptPlay(state) {
      state.active = true;
      state.play.accepted = true;
    },
    acceptTakeback(state) {
      state.play.takeback = Wording.verb.ACCEPT.toLowerCase();
    },
    declineTakeback(state) {
      state.play.takeback = null;
    },
    proposeTakeback(state) {
      state.play.takeback = Wording.verb.PROPOSE.toLowerCase();
    },
    acceptDraw(state) {
      state.play.draw = Wording.verb.ACCEPT.toLowerCase();
    },
    declineDraw(state) {
      state.play.draw = null;
    },
    proposeDraw(state) {
      state.play.draw = Wording.verb.PROPOSE.toLowerCase();
    },
    acceptResign(state) {
      state.play.resign = Wording.verb.ACCEPT.toLowerCase();
    },
    acceptRematch(state) {
      state.play.rematch = Wording.verb.ACCEPT.toLowerCase();
    },
    declineRematch(state) {
      state.play.rematch = null;
    },
    proposeRematch(state) {
      state.play.rematch = Wording.verb.PROPOSE.toLowerCase();
    },
    acceptLeave(state) {
      state.play.leave = Wording.verb.ACCEPT.toLowerCase();
    },
    timeOut(state) {
      state.play.timeOut = true;
    },
    // dialogs
    acceptDrawDialog(state, action) {
      state.dialogs.acceptDraw = action.payload;
    },
    acceptRematchDialog(state, action) {
      state.dialogs.acceptRematch = action.payload;
    },
    acceptResignDialog(state, action) {
      state.dialogs.acceptResign = action.payload;
    },
    acceptTakebackDialog(state, action) {
      state.dialogs.acceptTakeback = action.payload;
    },
    createInviteCodeDialog(state, action) {
      state.dialogs.createInviteCode = action.payload;
    },
    enterInviteCodeDialog(state, action) {
      state.dialogs.enterInviteCode = action.payload;
    },
    offerDrawDialog(state, action) {
      state.dialogs.offerDraw = action.payload;
    },
    offerRematchDialog(state, action) {
      state.dialogs.offerRematch = action.payload;
    },
    offerTakebackDialog(state, action) {
      state.dialogs.offerTakeback = action.payload;
    },
    playOnlineDialog(state, action) {
      state.dialogs.playOnline = {
        ...state.dialogs.playOnline,
        ...action.payload
      };
    },
    // timer
    timer(state, action) {
      state.timer = {
        ...state.timer,
        ...action.payload
      };
    },
  }
});

export const {
  reset,
  set,
  acceptPlay,
  acceptTakeback,
  declineTakeback,
  proposeTakeback,
  acceptDraw,
  declineDraw,
  proposeDraw,
  acceptResign,
  acceptRematch,
  declineRematch,
  proposeRematch,
  acceptLeave,
  timeOut,
  // dialogs
  acceptDrawDialog,
  acceptRematchDialog,
  acceptResignDialog,
  acceptTakebackDialog,
  createInviteCodeDialog,
  enterInviteCodeDialog,
  offerDrawDialog,
  offerRematchDialog,
  offerTakebackDialog,
  playOnlineDialog,
  // timer
  timer,
} = playModeSlice.actions;
export default playModeSlice.reducer;
