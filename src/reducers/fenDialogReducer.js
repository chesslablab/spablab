import fenDialogActionTypes from '../constants/dialog/fenDialogActionTypes';

const initialState = {
  open: false,
  fen: ''
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
    case fenDialogActionTypes.SET:
      return {
        ...state,
        fen: action.payload.fen,
      };
    default:
      return state;
  }
};

export default reducer;
