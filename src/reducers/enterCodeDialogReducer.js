import enterCodeDialogActionTypes from '../constants/enterCodeDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case enterCodeDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case enterCodeDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
