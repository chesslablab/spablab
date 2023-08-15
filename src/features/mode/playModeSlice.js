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
    acceptTakeback: {
      open: false,
    },
    createInviteCode: {
      open: false,
    },
    enterInviteCode: {
      open: false,
    },
    offerRematch: {
      open: false,
    },
    playOnline: {
      open: false,
    },
  },
  tables: {
    playOnline: [],
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
      state.accepted = action.payload.accepted;
      state.fen =  action.payload.fen;
      state.startPos =  action.payload.startPos;
      state.play = action.payload.play;
      state.timer = action.payload.timer;
    },
    timeOut(state) {
      state.timeOut = true;
    },
    acceptTakeback(state) {
      state.takeback = null;
    },
    declineTakeback(state) {
      state.takeback = Wording.verb.DECLINE.toLowerCase();
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
    acceptTakebackDialog(state, action) {
      state.dialogs.acceptTakeback = action.payload;
    },
    createInviteCodeDialog(state, action) {
      state.dialogs.createInviteCode = action.payload;
    },
    enterInviteCodeDialog(state, action) {
      state.dialogs.enterInviteCode = action.payload;
    },
    playOnlineDialog(state, action) {
      state.dialogs.playOnline = action.payload;
    },
    playOnlineTable(state, action) {
      state.tables.playOnline = action.payload;
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
  acceptTakebackDialog,
  createInviteCodeDialog,
  enterInviteCodeDialog,
  playOnlineDialog,
  playOnlineTable
} = playModeSlice.actions;
export default playModeSlice.reducer;
