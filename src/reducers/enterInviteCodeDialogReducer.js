import enterInviteCodeDialogActionTypes from '../constants/enterInviteCodeDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case enterInviteCodeDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case enterInviteCodeDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
