import createInviteCodeDialogActionTypes from '../constants/dialog/createInviteCodeDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case createInviteCodeDialogActionTypes.CLOSE:
      return {
        ...initialState,
        open: false,
      };
    case createInviteCodeDialogActionTypes.OPEN:
      return {
        ...initialState,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
