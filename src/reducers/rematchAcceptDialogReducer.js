import rematchAcceptDialogActionTypes from '../constants/dialog/rematchAcceptDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case rematchAcceptDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case rematchAcceptDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
