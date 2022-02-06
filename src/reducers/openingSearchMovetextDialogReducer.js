import chessOpeningSearchMovetextDialogActionTypes from '../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchMovetextDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case chessOpeningSearchMovetextDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
