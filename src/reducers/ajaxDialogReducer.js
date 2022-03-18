import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case progressDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case progressDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
