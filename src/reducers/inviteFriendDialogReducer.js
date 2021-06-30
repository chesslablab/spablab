import inviteFriendDialogActionTypes from '../constants/inviteFriendDialogActionTypes';

const initialState = {
  open: false,
  color: 'rand',
  time: 10,
  code: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case inviteFriendDialogActionTypes.CLOSE:
      return {
        ...initialState,
        open: false,
      };
    case inviteFriendDialogActionTypes.OPEN:
      return {
        ...initialState,
        open: true,
      };
    case inviteFriendDialogActionTypes.CREATE_CODE:
      return {
        ...state,
        color: action.payload.color,
        time: action.payload.time,
        code: action.payload.code,
      };
    default:
      return state;
  }
};

export default reducer;
