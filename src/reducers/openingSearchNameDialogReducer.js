import chessOpeningSearchNameDialogActionTypes from '../constants/dialog/chessOpeningSearchNameDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchNameDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case chessOpeningSearchNameDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
