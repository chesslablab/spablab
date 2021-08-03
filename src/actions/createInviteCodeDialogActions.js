import createInviteCodeDialogActions from '../constants/createInviteCodeDialogActionTypes';

export const close = () => ({
  type: createInviteCodeDialogActions.CLOSE
});

export const open = () => ({
  type: createInviteCodeDialogActions.OPEN
});
