import inviteFriendDialogActionTypes from '../constants/inviteFriendDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case inviteFriendDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case inviteFriendDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
