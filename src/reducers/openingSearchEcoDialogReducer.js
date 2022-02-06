import chessOpeningSearchEcoDialogActionTypes from '../constants/dialog/chessOpeningSearchEcoDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchEcoDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case chessOpeningSearchEcoDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
