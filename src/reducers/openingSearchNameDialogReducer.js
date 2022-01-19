import openingSearchNameDialogActionTypes from '../constants/openingSearchNameDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case openingSearchNameDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case openingSearchNameDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
