import { createSlice } from '@reduxjs/toolkit';
import Wording from 'common/Wording.js';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  accepted: false,
  timeOut: false,
  takeback: null,
  draw: null,
  resign: null,
  rematch: null,
  leave: null,
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
      state.accepted = true;
    },
    timeOut(state) {
      state.timeOut = true;
    },
    acceptTakeback(state) {
      state.takeback = Wording.verb.ACCEPT.toLowerCase();
    },
    declineTakeback(state) {
      state.takeback = null;
    },
    proposeTakeback(state) {
      state.takeback = Wording.verb.PROPOSE.toLowerCase();
    },
    acceptDraw(state) {
      state.draw = Wording.verb.ACCEPT.toLowerCase();
    },
    declineDraw(state) {
      state.draw = null;
    },
    proposeDraw(state) {
      state.draw = Wording.verb.PROPOSE.toLowerCase();
    },
    acceptResign(state) {
      state.resign = Wording.verb.ACCEPT.toLowerCase();
    },
    acceptRematch(state) {
      state.rematch = Wording.verb.ACCEPT.toLowerCase();
    },
    declineRematch(state) {
      state.rematch = null;
    },
    proposeRematch(state) {
      state.rematch = Wording.verb.PROPOSE.toLowerCase();
    },
    acceptLeave(state) {
      state.leave = Wording.verb.ACCEPT.toLowerCase();
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
      state.timer = action.payload;
    },
  }
});

export const {
  reset,
  set,
  acceptPlay,
  timer,
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
} = playModeSlice.actions;
export default playModeSlice.reducer;
