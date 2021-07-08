import createInvitationDialogActionTypes from '../constants/createInvitationDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case createInvitationDialogActionTypes.CLOSE:
      return {
        ...initialState,
        open: false,
      };
    case createInvitationDialogActionTypes.OPEN:
      return {
        ...initialState,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
