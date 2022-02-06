import loadPgnDialogActionTypes from '../constants/dialog/loadPgnDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadPgnDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case loadPgnDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
