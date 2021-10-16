import fenDialogActionTypes from '../constants/fenDialogActionTypes';

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
        fen: action.payload ? action.payload.fen : null
      };
    default:
      return state;
  }
};

export default reducer;
