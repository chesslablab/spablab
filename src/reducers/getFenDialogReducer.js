import getFenDialogActionTypes from '../constants/getFenDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getFenDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case getFenDialogActionTypes.OPEN:
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
