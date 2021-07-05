import createInvitationDialogActions from '../constants/createInvitationDialogActionTypes';

export const close = () => ({
  type: createInvitationDialogActions.CLOSE
});

export const open = () => ({
  type: createInvitationDialogActions.OPEN
});
