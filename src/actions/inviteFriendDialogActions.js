import inviteFriendDialogActionTypes from '../constants/inviteFriendDialogActionTypes';

export const close = () => ({
  type: inviteFriendDialogActionTypes.CLOSE
});

export const open = () => ({
  type: inviteFriendDialogActionTypes.OPEN
});

export const createCode = (payload) => ({
  type: inviteFriendDialogActionTypes.CREATE_CODE,
  payload: payload
});
