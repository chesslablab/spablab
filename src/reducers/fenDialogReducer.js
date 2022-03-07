import fenDialogActionTypes from '../constants/dialog/fenDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fenDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case fenDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
