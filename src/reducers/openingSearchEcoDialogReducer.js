import openingSearchEcoDialogActionTypes from '../constants/dialog/openingSearchEcoDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case openingSearchEcoDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case openingSearchEcoDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
