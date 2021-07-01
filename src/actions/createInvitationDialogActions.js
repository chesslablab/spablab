import createInvitationDialogActions from '../constants/createInvitationDialogActionTypes';

export const close = () => ({
  type: createInvitationDialogActions.CLOSE
});

export const open = () => ({
  type: createInvitationDialogActions.OPEN
});

export const createCode = (payload) => ({
  type: createInvitationDialogActions.CREATE_CODE,
  payload: payload
});
