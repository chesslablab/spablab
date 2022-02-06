import pgnDialogActionTypes from '../constants/dialog/pgnDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case pgnDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case pgnDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
