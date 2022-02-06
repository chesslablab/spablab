import takebackAcceptDialogActionTypes from '../constants/dialog/takebackAcceptDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case takebackAcceptDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case takebackAcceptDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
